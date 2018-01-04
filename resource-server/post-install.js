const createConfigFile = require('../tools/create-config-file');

const sampleConfig = {
  oktaSample: {
    oidc: {
      issuer: 'https://{yourOktaDomain}.com/oauth2/default',
      aud: 'api://default',
      cid: '{yourClientId}'
    },
    server: {
      port: 8000
    }
  }
};


createConfigFile(sampleConfig);
