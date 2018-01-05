const createConfigFile = require('./tools/create-config-file');

const sampleConfig = {
  webServer: {
    port: 8080,
    oidc: {
      clientId: '{clientId}',
      clientSecret: '{clientSecret}',
      issuer: 'https://{yourOktaDomain}.com/oauth2/default',
      redirectUri: 'http://localhost:8080/authorization-code/callback',
      scope: 'openid profile email'
    },
  },
  resourceServer: {
    port: 8000,
    oidc: {
      issuer: 'https://{yourOktaDomain}.com/oauth2/default'
    },
    assertClaims: {
      aud: 'api://default',
      cid: '{clientId}'
    }
  }
};

createConfigFile(sampleConfig);
