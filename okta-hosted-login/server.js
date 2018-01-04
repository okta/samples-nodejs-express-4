const sampleConfig = require('../.samples.config.json');
const SampleWebServer = require('../common/sample-web-server');

/**
 * Bootstrap the sample web server with the minimum required configuration to use the Okta-Hosted Login Page
 */
new SampleWebServer(sampleConfig.webServer);
