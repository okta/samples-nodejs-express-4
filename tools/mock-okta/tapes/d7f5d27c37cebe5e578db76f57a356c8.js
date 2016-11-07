var path = require("path");

/**
 * GET /oauth2/v1/authorize?client_id=5VNm1xZ6tnr8aDeGrHWf&redirect_uri=http://localhost:3000/authorization-code/callback&response_type=code&response_mode=query&state=STATE&nonce=NONCE&sessionToken=201113e1sgJCOVvrgREVZaKrhQRVPninO5RtYQ2cLbggYoU8BLLGA5V&scope=openid email profile
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip
 * accept-language: en-US
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqp2eTa8g9SdippPVB0WY6zg");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9991");
  res.setHeader("x-rate-limit-reset", "1478388288");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["JSESSIONID=69017DDC4F02DF97FB9C549E6058F818; Path=/","t=default; Path=/","DT=DI0jY96k29qQXyfliUaQlonug; Expires=Mon, 05-Nov-2018 23:23:52 GMT; Path=/","sid=102B5sPocTCQDaS-Vj5JRsvhg; Path=/","proximity_b34d5aef8ac96319ddbbb2c86dbb3ace=\"HIleHJD+EyvtdIoi07KUJDuAaOPTxgitJS5V4EQB6QkBMQOmZnQwMNuAaOSEI3qahhagFNHIai6uEO+CyhOtcEd9HBQF9SRqRNiNi/9VkySwnWYlf2V1kfCTCQzdv3JyiOl/X6oHr7e0rstwT4R0HO9DrLCU1cxVa7nZ+iw/0ZuecGs641cz3ubknfIE5iyw\"; Version=1; Max-Age=2147483647; Expires=Fri, 24-Nov-2084 02:37:59 GMT; Path=/","JSESSIONID=69017DDC4F02DF97FB9C549E6058F818; Path=/"]);
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("location", "http://localhost:3000/authorization-code/callback?code=hNfpENFeU2jy8uFhxl5g&state=STATE");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:52 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
