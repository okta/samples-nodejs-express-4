var path = require("path");

/**
 * GET /login/sessionCookieRedirect?checkAccountSetupComplete=true&token=20111aMY5jIGquKgnOa-kT4SO7JrarwGZ9k--9sxV2-cHYrcdoJJqtx&redirectUrl=http://127.0.0.1:7777/oauth2/v1/authorize/redirect?okta_key=1WKA0B_xQ2JTVMrptQbDKAcnPQikfRS2tnuDV4uQIaw
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: JSESSIONID=DD55AA50A519B66EB2B566465D7D36A3; DT=DI02AAY7VUOSl2V4qMz3cLWpQ
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqKl8XIdLZTSO_I6WPBzeGEg");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","t=default; Path=/","sid=1022GvmygN0SNKvwWUkpV5JxA;Version=1;Path=/;HttpOnly","proximity_d6db774d595b813274f5f7dc53bf762a=\"2wujEYQ3eWviD388fxTfEBXp5kQpuj0JaTJwpnQk3KBkQ8Z8WLTe+J1pFnSCLXtCrIFbEh3TlM1hNflRQf7gUKJhqf14tBbyLrE95H9slfjXEiE6Xgjoyq980qaoFf6tF2g7fOZRzeR17/cWmySTlKE5PXs1xZpRLL4rKS9u7ucYFAiOav4KL+Ugw8Si8Jqs\"; Version=1; Max-Age=31536000; Expires=Sat, 06-Oct-2018 20:08:30 GMT; Path=/","JSESSIONID=DD55AA50A519B66EB2B566465D7D36A3; Path=/"]);
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9996");
  res.setHeader("x-rate-limit-reset", "1507320552");
  res.setHeader("x-okta-backend", "albatross");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("location", "http://127.0.0.1:7777/oauth2/v1/authorize/redirect?okta_key=1WKA0B_xQ2JTVMrptQbDKAcnPQikfRS2tnuDV4uQIaw");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Fri, 06 Oct 2017 20:08:30 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
