var path = require("path");

/**
 * GET /oauth2/v1/authorize/redirect?okta_key=1WKA0B_xQ2JTVMrptQbDKAcnPQikfRS2tnuDV4uQIaw
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: DT=DI02AAY7VUOSl2V4qMz3cLWpQ; t=default; sid=1022GvmygN0SNKvwWUkpV5JxA; proximity_d6db774d595b813274f5f7dc53bf762a="2wujEYQ3eWviD388fxTfEBXp5kQpuj0JaTJwpnQk3KBkQ8Z8WLTe+J1pFnSCLXtCrIFbEh3TlM1hNflRQf7gUKJhqf14tBbyLrE95H9slfjXEiE6Xgjoyq980qaoFf6tF2g7fOZRzeR17/cWmySTlKE5PXs1xZpRLL4rKS9u7ucYFAiOav4KL+Ugw8Si8Jqs"; JSESSIONID=DD55AA50A519B66EB2B566465D7D36A3
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "req8qUbxAGPTYm5vDdEIwQXWA");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9995");
  res.setHeader("x-rate-limit-reset", "1507320552");
  res.setHeader("referrer-policy", "no-referrer");
  res.setHeader("x-okta-backend", "albatross");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("set-cookie", ["t=default; Path=/","sid=1022GvmygN0SNKvwWUkpV5JxA;Version=1;Path=/;HttpOnly","proximity_d6db774d595b813274f5f7dc53bf762a=\"2wujEYQ3eWviD388fxTfEBXp5kQpuj0JaTJwpnQk3KBkQ8Z8WLTe+J1pFnSCLXtCrIFbEh3TlM1hNflRQf7gUKJhqf14tBbyLrE95H9slfjXEiE6Xgjoyq980qaoFf6tF2g7fOZRzeR17/cWmySTlKE5PXs1xZpRLL4rKS9u7ucYFAiOav4KL+Ugw8Si8Jqs\"; Version=1; Max-Age=31536000; Expires=Sat, 06-Oct-2018 20:08:30 GMT; Path=/","JSESSIONID=DD55AA50A519B66EB2B566465D7D36A3; Path=/"]);
  res.setHeader("location", "http://localhost:3000/authorization-code/callback?code=N5Xmg4ZAuwM_yKlTc-tV&state=f29aee5e-38ac-40ae-b194-398cc86ab4a9");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Fri, 06 Oct 2017 20:08:30 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
