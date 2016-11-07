var path = require("path");

/**
 * GET /login/sessionCookieRedirect?checkAccountSetupComplete=true&token=201119P7fNJDOT3D28gUN-njKFGMWLuO-r44OkOGoOr675vdeij9igK&redirectUrl=http://127.0.0.1:7777/oauth2/v1/authorize/redirect;jsessionid=C8CAB112A54DECAB36F64A605FA44B2A?okta_key=scsiaBORXe6htXjLWjQY5U6S7UPx2utd0eRCWp3seRo
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: JSESSIONID=70AE96C8582376C33727D5332CA5E78A; DT=DI0szFpmcNvRFaypiGqtGoNmA
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "req3Dqfy35YTXaFHveHeDrtOQ");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9996");
  res.setHeader("x-rate-limit-reset", "1478388288");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","t=default; Path=/","sid=102C26SfbUCSeGwm7GyQR_Iug; Path=/","proximity_8f8ad6152faec0ef482c28a7e8352021=\"BHRiJkYDZvLDsA64Es6Cf+gQZiHO3zSInW7h2dJk1PiDIAl2gDG3PfOaHCN3vKuziinaM7THJjZDpaZGalhtno66/bndlOpil73QMOtJJ1ideLTMFlDFK2Xj622gYoMmyjAHtMe8SGbpez69MepNnvca/2UTT5h3LpQxCNnxsyCHAYRLda/QaoJpl9tSmy9P\"; Version=1; Max-Age=2147483647; Expires=Fri, 24-Nov-2084 02:37:57 GMT; Path=/","JSESSIONID=70AE96C8582376C33727D5332CA5E78A; Path=/"]);
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("location", "http://127.0.0.1:7777/oauth2/v1/authorize/redirect;jsessionid=C8CAB112A54DECAB36F64A605FA44B2A?okta_key=scsiaBORXe6htXjLWjQY5U6S7UPx2utd0eRCWp3seRo");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:49 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
