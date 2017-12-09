const createConfigFile = require('../tools/create-config-file');

const sampleConfig = {
  oktaSample: {
    oidc: {
      oktaUrl: 'https://{yourOktaDomain}.com/',
      issuer: 'https://{yourOktaDomain}.com/oauth2/default',
      clientId: 'xxyyyzzz',
      clientSecret: 'xxyyyzzz',
      redirectUri: 'http://localhost:8080/authorization-code/callback'
    },
    server: {
      port: 8080
    }
  }
};

createConfigFile(sampleConfig);
