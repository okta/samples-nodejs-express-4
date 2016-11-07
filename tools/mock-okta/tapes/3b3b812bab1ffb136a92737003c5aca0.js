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
 * cookie: t=default; DT=DI0jRgRLD_uQBqSzCUCxXy5OA; JSESSIONID=C8CAB112A54DECAB36F64A605FA44B2A
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "req70gYmjqFR2KaQNJ2xQjAmA");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9998");
  res.setHeader("x-rate-limit-reset", "1478388288");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/"]);
  res.setHeader("location", "http://rain.okta1.com:1802/login/login.htm?fromURI=%2Foauth2%2Fv1%2Fauthorize%2Fredirect%3Bjsessionid%3DC8CAB112A54DECAB36F64A605FA44B2A%3Fokta_key%3DscsiaBORXe6htXjLWjQY5U6S7UPx2utd0eRCWp3seRo");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:48 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
