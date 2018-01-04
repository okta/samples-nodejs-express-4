const createConfigFile = require('../tools/create-config-file');

const sampleConfig = {
  oidc: {
    issuer: 'https://{yourOktaDomain}.com/oauth2/default',
    aud: 'api://default',
    clientId: '{yourClientId}',
    clientSecret: '{yourClientSecret}',
    redirectUri: 'http://localhost:8080/authorization-code/callback',
    scope: 'openid profile email'
  },
  server: {
    port: 8080
  }
};

createConfigFile(sampleConfig);
