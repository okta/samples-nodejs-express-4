var path = require("path");

/**
 * GET /oauth2/default/v1/authorize?scope=openid profile email&response_type=code&redirect_uri=http://localhost:3000/authorization-code/callback&state=f29aee5e-38ac-40ae-b194-398cc86ab4a9&client_id=0oaouvtY01adO96Z00g3
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
  res.setHeader("x-okta-request-id", "reqOrCmFIpcQamCzzyXjUS2uA");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=5059E6FF7345C6845E26364BCD29CFA9; Path=/","t=default; Path=/","DT=DI0pJrIhHufR6m9XkWWgLOenQ; Expires=Sun, 06-Oct-2019 20:08:18 GMT; Path=/","sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=5059E6FF7345C6845E26364BCD29CFA9; Path=/"]);
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9998");
  res.setHeader("x-rate-limit-reset", "1507320552");
  res.setHeader("referrer-policy", "no-referrer");
  res.setHeader("x-okta-backend", "albatross");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("location", "http://rain.okta1.com:1802/login/login.htm;jsessionid=5059E6FF7345C6845E26364BCD29CFA9?fromURI=%2Foauth2%2Fv1%2Fauthorize%2Fredirect%3Fokta_key%3D1WKA0B_xQ2JTVMrptQbDKAcnPQikfRS2tnuDV4uQIaw");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Fri, 06 Oct 2017 20:08:18 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
