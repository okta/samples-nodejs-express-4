'use strict';

const OIDCStrategy = require('passport-openidconnect');
const request = require('request');
const jws = require('jws');
const jwk2pem = require('pem-jwk').jwk2pem;

const cachedJwks = {};

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

// Note: need to be able to pass in own verify function
function verifyWith(verify) {
  return function (req, iss, sub, profile, jwtClaims, accessToken, refreshToken, params, verified) {

    // Verify that the token was not issued in the future (accounting for clock
    // skew in the event this server or the Okta authorization server has drifted).
    const now = Math.floor(new Date().getTime() / 1000);
    const maxClockSkew = 300; // 5 minutes
    if (jwtClaims.iat > (now + maxClockSkew)) {
      this.error(new Error('The JWT was issued in the future - iat ${jwtClaims.iat}'));
      return;
    }

    const decoded = jws.decode(params.id_token);
    if (!decoded) {
      this.error(new Error('id_token could not be decoded from the response'));
      return;
    }

    new Promise((resolve, reject) => {
      // If we've already cached this JWK, return it
      if (cachedJwks[decoded.header.kid]) {
        resolve(cachedJwks[decoded.header.kid]);
        return;
      }

      // If it's not in the cache, get the latest JWKS from /oauth2/v1/keys
      const options = {
        // QUESTION: IS ISSUER THE RIGHT THING HERE? BEFORE, I HAD CONFIG.OIDC.OKTAURL.
        url: `${issuer}/oauth2/v1/keys`,
        json: true,
      };
      request(options, (err, resp, json) => {
        if (err) {
          reject(err);
          return;
        } else if (json.error) {
          reject(json);
          return;
        }

        json.keys.forEach(key => cachedJwks[key.kid] = key);
        if (!cachedJwks[decoded.header.kid]) {
          // QUESTION: Do I have the right scope here??!?!!
          this.error(new Error('No public key for the returned id_token'));
          return;
        }

        resolve(cachedJwks[decoded.header.kid]);
      });
    })
    .then((jwk) => {
      // Using the jwk, verify that the id_token signature is valid. In this
      // case, the library we're using, JWS, requires PEM encoding for our JWK.
      const pem = jwk2pem(jwk);
      if (!jws.verify(params.id_token, jwk.alg, pem)) {
        this.error(new Error('id_token signature is invalid'));
        return;
      }

      verified(null, jwtClaims);
    })
    .catch(err => {
      this.error(`Error: ${JSON.stringify(err)}`);
    });
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

      // Pass req to verifier - don't override.
      passReqToCallback: true
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

    console.log('calling authenticate');

    // Workaround because passport-openidconnect does not distinguish between
    // authorize and callback calls - if we are in the callback request, we
    // want to do some additional checks
    if (req.url.indexOf('/authorization-code/callback') > -1 && !req.query.code) {
      return this.fail(
        {message: 'Required query parameter "code" is missing'},
        403
      );
    }

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
