var path = require("path");

/**
 * GET /oauth2/v1/authorize/redirect;jsessionid=C8CAB112A54DECAB36F64A605FA44B2A?okta_key=scsiaBORXe6htXjLWjQY5U6S7UPx2utd0eRCWp3seRo
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: DT=DI0szFpmcNvRFaypiGqtGoNmA; t=default; sid=102C26SfbUCSeGwm7GyQR_Iug; proximity_8f8ad6152faec0ef482c28a7e8352021="BHRiJkYDZvLDsA64Es6Cf+gQZiHO3zSInW7h2dJk1PiDIAl2gDG3PfOaHCN3vKuziinaM7THJjZDpaZGalhtno66/bndlOpil73QMOtJJ1ideLTMFlDFK2Xj622gYoMmyjAHtMe8SGbpez69MepNnvca/2UTT5h3LpQxCNnxsyCHAYRLda/QaoJpl9tSmy9P"; JSESSIONID=70AE96C8582376C33727D5332CA5E78A
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqVnxE476dRbe9z-g5Na-k9Q");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9995");
  res.setHeader("x-rate-limit-reset", "1478388288");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("set-cookie", ["t=default; Path=/","sid=102C26SfbUCSeGwm7GyQR_Iug; Path=/","JSESSIONID=70AE96C8582376C33727D5332CA5E78A; Path=/"]);
  res.setHeader("location", "http://localhost:3000/authorization-code/callback?code=ZyZnIfmPNIKxWAux1jsy&state=STATE");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:49 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
