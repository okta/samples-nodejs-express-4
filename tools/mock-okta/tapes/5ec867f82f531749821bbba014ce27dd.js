var path = require("path");

/**
 * POST /api/v1/authn
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * content-length: 121
 * origin: http://127.0.0.1:7777
 * x-okta-xsrftoken: 
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * content-type: application/json
 * accept: application/json
 * x-requested-with: XMLHttpRequest
 * accept-encoding: gzip
 * accept-language: en-US
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqxkZFmTIRTHW7-YLTONXQMg");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=B74C8FEC5F7D905A21E7988ACBC53A39; Path=/","DT=DI0sFErlXCyRx-1NKHQV9y5pw; Expires=Wed, 23-Oct-2019 18:59:34 GMT; Path=/"]);
  res.setHeader("x-rate-limit-limit", "1200");
  res.setHeader("x-rate-limit-remaining", "1199");
  res.setHeader("x-rate-limit-reset", "1508785234");
  res.setHeader("access-control-allow-origin", "http://127.0.0.1:7777");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("access-control-allow-headers", "Content-Type");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Mon, 23 Oct 2017 18:59:34 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHBpcmVzQXQiOiIyMDE3LTEwLTIzVDE5OjA0OjM0LjAwMFoiLCJzdGF0dXMiOiJTVUNDRVNTIiwic2Vzc2lvblRva2VuIjoiMjAxMTFoMFpseGpaTTZoZHU1NkwzVTJWUVNvamFYUFRBNnVaVmlVcjV3SU9UN0lrMjJaaXJLXyIsIl9lbWJlZGRlZCI6eyJ1c2VyIjp7ImlkIjoiMDB1b3h4cXF4aVhaUTN4bVgwZzMiLCJwYXNzd29yZENoYW5nZWQiOiIyMDE3LTEwLTIzVDAwOjU5OjQ3LjAwMFoiLCJwcm9maWxlIjp7ImxvZ2luIjoiZ2VvcmdlQGFjbWUuY29tIiwiZmlyc3ROYW1lIjoiR2VvcmdlIiwibGFzdE5hbWUiOiJXYXNoaW5ndG9uIiwibG9jYWxlIjoiZW4iLCJ0aW1lWm9uZSI6IkFtZXJpY2EvTG9zX0FuZ2VsZXMifX19fQ==", "base64"));
  res.end();

  return __filename;
};
