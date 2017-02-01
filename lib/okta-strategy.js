'use strict';

const OIDCStrategy = require('passport-openidconnect');

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
      scope: 'openid email profile',

      // Resolves issuer - passed in through options
      resolver: {
        resolve: (identifier, cb) => cb(null, options.baseUrl),
      },

      // There is currently no option for dynamic client registration, use
      // the client options that are passed through the constructor
      registrar: {
        resolve: (issuer, cb) => cb(null, {
          id: options.clientId,
          secret: options.clientSecret,
          redirectURIs: [options.redirectUri]
        }),
      }
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
