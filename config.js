var path = require('path');

// Users can also provide the testenv configuration at the root folder: https://www.npmjs.com/package/dotenv
require('dotenv').config({ path: path.join(__dirname, 'testenv') });

var ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
var CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
var CLIENT_SECRET = process.env.CLIENT_SECRET || '{clientSecret}';
var SPA_CLIENT_ID = process.env.SPA_CLIENT_ID || '{spaClientId}';
var OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK ? true : false;

module.exports = {
  webServer: {
    port: 8080,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: 'http://localhost:8080',
      scope: 'openid profile email',
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
      }
    },
  },
  resourceServer: {
    port: 8000,
    oidc: {
      clientId: SPA_CLIENT_ID,
      issuer: ISSUER,
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
      }
    },
    assertClaims: {
      aud: 'api://default',
      cid: SPA_CLIENT_ID
    }
  }
};
