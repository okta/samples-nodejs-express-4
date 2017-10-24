var path = require("path");

/**
 * GET /oauth2/v1/authorize/redirect?okta_key=ONHYUjtp7FHAP358vNnHFgbRFNVpCEruGRtdiffwbdA
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: DT=DI0sFErlXCyRx-1NKHQV9y5pw; t=default; sid=102TyF_klyhSbim6RL_GTmW5w; proximity_6d91fdca6790f698a3af81622d4abc60="ggfOlTE5YKQd/xAzn4tjgBQfOerFAXw+2+UMDOqTAzARtaIbF/5qbKvTFvjVPAMQrNEuS7ZqPTtJoCFGmqQjyIllL48jwfBjvxC/TeU++BeNUJhC2jTjlVnORgs9Dh3mYGcBXE5qfZ194SZztU1giMTcGiu6oKiyNrWdOe5FpdjK4G6h7qCyd5NjdYTLQa2U"; JSESSIONID=B74C8FEC5F7D905A21E7988ACBC53A39
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqXcppwrVqRc-AcvqJOPiInw");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9995");
  res.setHeader("x-rate-limit-reset", "1508785218");
  res.setHeader("referrer-policy", "no-referrer");
  res.setHeader("x-okta-backend", "albatross");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("set-cookie", ["t=default; Path=/","sid=102TyF_klyhSbim6RL_GTmW5w;Version=1;Path=/;HttpOnly","proximity_6d91fdca6790f698a3af81622d4abc60=\"ggfOlTE5YKQd/xAzn4tjgBQfOerFAXw+2+UMDOqTAzARtaIbF/5qbKvTFvjVPAMQrNEuS7ZqPTtJoCFGmqQjyIllL48jwfBjvxC/TeU++BeNUJhC2jTjlVnORgs9Dh3mYGcBXE5qfZ194SZztU1giMTcGiu6oKiyNrWdOe5FpdjK4G6h7qCyd5NjdYTLQa2U\"; Version=1; Max-Age=31536000; Expires=Tue, 23-Oct-2018 18:59:36 GMT; Path=/","JSESSIONID=B74C8FEC5F7D905A21E7988ACBC53A39; Path=/"]);
  res.setHeader("location", "http://localhost:8080/authorization-code/callback?code=mYWd1PQN5avOg9yqylOy&state=STATE");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Mon, 23 Oct 2017 18:59:36 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
