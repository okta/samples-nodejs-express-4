var path = require("path");

/**
 * OPTIONS /api/v1/authn
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * access-control-request-method: POST
 * origin: http://localhost:3000
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * access-control-request-headers: content-type, x-okta-user-agent-extended, x-okta-xsrftoken
 * accept: * / *
 * accept-encoding: gzip
 * accept-language: en-US
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqxH2qvtKiR4OwdTGmUqh22g");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9992");
  res.setHeader("x-rate-limit-reset", "1478388288");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=096C509E67082E9636AF3EB391EC3714; Path=/","DT=DI0Rd-vg09yRiCFnXwUgU_D1w; Expires=Mon, 05-Nov-2018 23:23:52 GMT; Path=/","JSESSIONID=096C509E67082E9636AF3EB391EC3714; Path=/"]);
  res.setHeader("access-control-allow-origin", "http://localhost:3000");
  res.setHeader("access-control-allow-methods", "POST, OPTIONS");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("access-control-max-age", "3600");
  res.setHeader("access-control-allow-headers", "content-type, x-okta-user-agent-extended, x-okta-xsrftoken,Content-Type");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("allow", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:52 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
