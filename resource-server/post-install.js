const createConfigFile = require('../tools/create-config-file');

const sampleConfig = {
  oktaSample: {
    oidc: {
      issuer: 'https://{yourOktaDomain}.com/oauth2/default'
    },
    server: {
      port: 8000
    }
  }
};


createConfigFile(sampleConfig);
