const OIDCStrategy = require('passport-openidconnect');

class OktaStrategy extends OIDCStrategy {

  // options:
  // - clientId
  // - clientSecret
  // - redirectUri
  // - scope?
  // - other options to openidconnect that they should be able to override
  //   maybe just set up an "extraOptions" type of thing
  constructor() {
    const options = {
      sessionKey: 'bla bb',
      skipUserProfile: true,
      scope: 'openid email profile',
      resolver: {
        resolve: function (identifier, cb) {
          console.log('CALLING RESOLVER.RESOLVE');
          cb(null, 'https://oswtests.oktapreview.com');
        }
      },
      registrar: {
        resolve: function (issuer, cb) {
          console.log('CALLING REGISTRAR.RESOLVE');
          cb(null, {
            id: 'rW47c465c1wc3MKzHznu',
            secret: 'TsQ1Fmglq43ZwrjK418zxjY-t6wa71h2WsOPOMW2',
            redirectURIs: [
              'http://localhost:3000/done'
            ]
          });
        }
      }
    };

    function verify() {
      // Probably here we'll want to pass in the req, and just do all our own
      // validation. Do they do any validation on their own??!?!!?!
      // And put this all in that module, so that they don't have to do it themselves!
      // Including getting the keys, etc...

      console.log('************HERE WE ARE******************');
      console.log('IS THIS THE VERIFY CALLBACK?');
      console.log(profile);
      console.log(jwtClaims);
      verified(null, jwtClaims);
    }

    this.name = 'okta';
    super(options, verify);
  }

}

module.exports.Strategy = OktaStrategy;
