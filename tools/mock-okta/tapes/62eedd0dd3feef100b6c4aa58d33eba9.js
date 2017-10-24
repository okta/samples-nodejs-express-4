var path = require("path");

/**
 * GET /login/getimage?username=george
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * accept: * / *
 * x-okta-xsrftoken: 
 * x-requested-with: XMLHttpRequest
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: DT=DI0yH_le7ZQQw24ioj80y_kSQ; t=default; JSESSIONID=FC08AD459E01024D5B6C6A1D8FE25E22
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqSp6r0GSaR2yEKE79QypD9g");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","t=default; Path=/","sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=FC08AD459E01024D5B6C6A1D8FE25E22; Path=/"]);
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9997");
  res.setHeader("x-rate-limit-reset", "1508785218");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("x-okta-backend", "albatross");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("content-type", "application/json;charset=utf-8");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "79");
  res.setHeader("date", "Mon, 23 Oct 2017 18:59:29 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJyZXN1bHQiOiJzdWNjZXNzIiwicHdkSW1nIjoiL2ltZy9zZWN1cml0eS91bmtub3duLnBuZyIsImltYWdlRGVzY3JpcHRpb24iOiIifQ==", "base64"));
  res.end();

  return __filename;
};
