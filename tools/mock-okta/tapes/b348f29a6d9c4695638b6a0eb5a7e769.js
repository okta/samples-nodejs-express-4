var path = require("path");

/**
 * DELETE /api/v1/sessions/me
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * accept: application/json
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * origin: http://localhost:3000
 * content-type: application/json
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: t=default; DT=DI0jY96k29qQXyfliUaQlonug; sid=102B5sPocTCQDaS-Vj5JRsvhg; proximity_b34d5aef8ac96319ddbbb2c86dbb3ace="HIleHJD+EyvtdIoi07KUJDuAaOPTxgitJS5V4EQB6QkBMQOmZnQwMNuAaOSEI3qahhagFNHIai6uEO+CyhOtcEd9HBQF9SRqRNiNi/9VkySwnWYlf2V1kfCTCQzdv3JyiOl/X6oHr7e0rstwT4R0HO9DrLCU1cxVa7nZ+iw/0ZuecGs641cz3ubknfIE5iyw"; JSESSIONID=69017DDC4F02DF97FB9C549E6058F818
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 204;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqnjZyQPz8TJyi9U5EehGZQw");
  res.setHeader("x-rate-limit-limit", "1200");
  res.setHeader("x-rate-limit-remaining", "1196");
  res.setHeader("x-rate-limit-reset", "1478388289");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("access-control-allow-origin", "http://localhost:3000");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("access-control-allow-headers", "Content-Type");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("set-cookie", ["JSESSIONID=69017DDC4F02DF97FB9C549E6058F818; Path=/"]);
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:53 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
