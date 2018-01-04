const url = require('url');
const sampleConfig = require('./.samples.config.json');
const SampleWebServer = require('../common/sample-web-server');

const oidcMiddlewareConfig = {
  routes: {
    login: {
      viewHandler: (req, res) => {
        const baseUrl = url.parse(sampleConfig.oidc.issuer).protocol + '//' + url.parse(sampleConfig.oidc.issuer).host;
        // Render your custom login page, you must create this view for your application and use the Okta Sign-In Widget
        res.render('custom-login', {
          csrfToken: req.csrfToken(),
          baseUrl: baseUrl
        });
      }
    }
  }
};

/**
 * Bootstrap the sample web server with the additional configuration for the custom login page
 */
new SampleWebServer(sampleConfig, oidcMiddlewareConfig);
