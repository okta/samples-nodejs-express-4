var path = require("path");

/**
 * POST /api/v1/authn
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * content-length: 120
 * accept: application/json
 * origin: http://localhost:3000
 * x-okta-xsrftoken: 
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * content-type: application/json
 * accept-encoding: gzip
 * accept-language: en-US
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqrpgRSVBKQIOk04JklnG0Kw");
  res.setHeader("x-rate-limit-limit", "1200");
  res.setHeader("x-rate-limit-remaining", "1197");
  res.setHeader("x-rate-limit-reset", "1478388289");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=565AC32CD537E88B53B611EC3F07C00D; Path=/","DT=DI0r6H378QBSSW39jrOqytfBQ; Expires=Mon, 05-Nov-2018 23:23:52 GMT; Path=/"]);
  res.setHeader("access-control-allow-origin", "http://localhost:3000");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("access-control-allow-headers", "Content-Type");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:52 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHBpcmVzQXQiOiIyMDE2LTExLTA2VDAxOjIzOjUyLjAwMFoiLCJzdGF0dXMiOiJTVUNDRVNTIiwic2Vzc2lvblRva2VuIjoiMjAxMTEzZTFzZ0pDT1Z2cmdSRVZaYUtyaFFSVlBuaW5PNVJ0WVEyY0xiZ2dZb1U4QkxMR0E1ViIsIl9lbWJlZGRlZCI6eyJ1c2VyIjp7ImlkIjoiMDB1a3o2RTA2dnRyR0RWbjkwZzMiLCJwYXNzd29yZENoYW5nZWQiOiIyMDE2LTEwLTMwVDA0OjE4OjM0LjAwMFoiLCJwcm9maWxlIjp7ImxvZ2luIjoiam9obkBhY21lLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkFkYW1zIiwibG9jYWxlIjoiZW5fVVMiLCJ0aW1lWm9uZSI6IkFtZXJpY2EvTG9zX0FuZ2VsZXMifX19fQ==", "base64"));
  res.end();

  return __filename;
};
