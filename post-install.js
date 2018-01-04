const createConfigFile = require('./tools/create-config-file');

const sampleConfig = {
  webServer: {
    port: 8080,
    oidc: {
      issuer: 'https://{yourOktaDomain}.com/oauth2/default',
      clientId: '{yourWebApplicationClientId}',
      clientSecret: '{yourWebApplicationClientSecret}',
      redirectUri: 'http://localhost:8080/authorization-code/callback',
      scope: 'openid profile email'
    },
  },
  resourceServer: {
    port: 8000,
    oidc: {
      issuer: 'https://{yourOktaDomain}.com/oauth2/default',
      clientId: '{yourWebApplicationClientId}',
      clientSecret: '{yourWebApplicationClientSecret}'
    },
    assertClaims: {
      aud: 'api://default',
      cid: '{clientIdOfYourSpaApplication}'
    }
  }
};

createConfigFile(sampleConfig);
