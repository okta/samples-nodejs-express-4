'use strict';

const OIDCStrategy = require('passport-openidconnect');
const request = require('request');

function dynamic(options) {
  return (identifier, cb) => {
    // TODO: Catch this request!!!
    const wellKnown = `${options.baseUrl}/.well-known/openid-configuration`;
    
    request.get(wellKnown, (err, res, body) => {
      if (err) {
        return cb(err);
      }
      if (res.statusCode !== 200) {
        return cb(new Error(`Unexpected status code from OpenID Connect discovery document: ${res.statusCode}`));
      }

      const config = {};

      try {
        const json = JSON.parse(body);
        const config = {
          issuer: json.issuer,
          authorizationURL: json.authorization_endpoint,
          tokenURL: json.token_endpoint,
          userInfoURL: json.userinfo_endpoint,

          clientID: options.clientId,
          clientSecret: options.clientSecret,
          callbackURL: options.redirectUri,

          nonce: true,

          _raw: json,
        };

        return cb(null, config);
      } catch (e) {
        return cb(new Error('Failed to parse OpenID Connect discovery document'));
      }
    });
  };
}

function verifyWith(verify) {
  return (iss, sub, profile, jwtClaims, accessToken, refreshToken, params, verified) => {
    try {
      // Probably here we'll want to pass in the req, and just do all our own
      // validation. Do they do any validation on their own??!?!!?!
      // And put this all in that module, so that they don't have to do it themselves!
      // Including getting the keys, etc...

      console.log('************HERE WE ARE******************');
      console.log('IS THIS THE VERIFY CALLBACK?');
      console.log(profile);
      console.log(jwtClaims);

      if (verify) {
        verify(iss, sub, profile, jwtClaims, accessToken, refreshToken, params);
      }

      verified(null, jwtClaims);
    } catch (err) {
      verified(err);
    }
  };
}

class OktaStrategy extends OIDCStrategy {

  // options:
  // - clientId
  // - clientSecret
  // - redirectUri
  // - scope?
  // - other options to openidconnect that they should be able to override
  //   maybe just set up an "extraOptions" type of thing
  constructor(options, verify) {
    const oktaFields = ['baseUrl', 'clientId', 'clientSecret', 'redirectUri'];
    oktaFields.forEach((field) => {
      if (!options[field]) {
        throw new Error(`${field} is a required field`);
      }
    });

    const defaults = {
      // The key that is used to store redirect state (like state, nonce, etc)
      sessionKey: 'redirectState',

      // Don't make the userInfo request, i.e. pull all claims from the id_token
      // Override if more claims are needed, or working with large sets of
      // groups
      skipUserProfile: true,

      // Default scope value - override if different scopes are needed
      scope: 'email profile',

      // Placeholder resolver/registrar - no option to override the setup
      // function that's used in the openid-connect constructor
      resolver: {},
      registrar: {},
    };

    // Extend defaults with options that are passed into the constructor, and
    // remove OktaStrategy specific options.
    Object.assign(defaults, options);
    oktaFields.forEach((field) => delete defaults[field]);

    // Token response verification happens in this order:
    // 1. Default passport-openidconnect verification
    // 2. OktaStrategy verification
    // 3. Optionally, the verify function that is passed in
    super(defaults, verifyWith(verify));
    this.configure(dynamic(options));
    this.name = 'okta';
  }

  authenticate(req, options) {
    // This is a bit of a workaround - ideally, req would be passed to the
    // authorizationParams hook so that we can set a dynamic sessionToken from
    // the incoming request. This happens to work because new instances of this
    // strategy are instantiated on each request - the sessionToken will
    // not leak to other incoming requests.
    //
    // Note: Should post a fix to this upstream
    if (req.query.sessionToken) {
      this.sessionToken = req.query.sessionToken;
    }
    return super.authenticate(req, options);
  }

  authorizationParams(options) {
    return this.sessionToken ? {sessionToken: this.sessionToken} : {};
  }

}

module.exports.Strategy = OktaStrategy;
