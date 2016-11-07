var path = require("path");

/**
 * DELETE /api/v1/sessions/me
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * accept: application/json
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * origin: http://localhost:3000
 * content-type: application/json
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: DT=DI0szFpmcNvRFaypiGqtGoNmA; proximity_8f8ad6152faec0ef482c28a7e8352021="BHRiJkYDZvLDsA64Es6Cf+gQZiHO3zSInW7h2dJk1PiDIAl2gDG3PfOaHCN3vKuziinaM7THJjZDpaZGalhtno66/bndlOpil73QMOtJJ1ideLTMFlDFK2Xj622gYoMmyjAHtMe8SGbpez69MepNnvca/2UTT5h3LpQxCNnxsyCHAYRLda/QaoJpl9tSmy9P"; t=default; sid=102C26SfbUCSeGwm7GyQR_Iug; JSESSIONID=70AE96C8582376C33727D5332CA5E78A
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 204;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "req5msEVhJJTfOYIxxzzMhPnw");
  res.setHeader("x-rate-limit-limit", "1200");
  res.setHeader("x-rate-limit-remaining", "1198");
  res.setHeader("x-rate-limit-reset", "1478388289");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("access-control-allow-origin", "http://localhost:3000");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("access-control-allow-headers", "Content-Type");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("set-cookie", ["JSESSIONID=70AE96C8582376C33727D5332CA5E78A; Path=/"]);
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:51 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
