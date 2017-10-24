var path = require("path");

/**
 * GET /oauth2/default/v1/userinfo
 *
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept-encoding: gzip
 * accept: application/json
 * authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ikh3MlVXVy15Z0FCMVY2ZFV1MHh2Qk14RHo5VUFZa3AwWFBScmxPX2dHREkifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlc4UTRscmtPaE9oeTdLWl9wZHhnbEhVdFF1djJ5V2Q0WkwxMTMyUWlKZkkiLCJpc3MiOiJodHRwOi8vcmFpbi5va3RhMS5jb206MTgwMi9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE1MDg3ODUxNzYsImV4cCI6MTUwODc4ODc3NiwiY2lkIjoiMG9hcDQ0Z3N2WFVpdEJaU3YwZzMiLCJ1aWQiOiIwMHVveHhxcXhpWFpRM3htWDBnMyIsInNjcCI6WyJwcm9maWxlIiwib3BlbmlkIiwiZW1haWwiXSwic3ViIjoiZ2VvcmdlQGFjbWUuY29tIn0.RPcEegXmBCe8Uh490cFu9woWgF3ECD4caVhOaIekNYZHutCGosKsNXU1Br8007fNJ1GoNCfCjY04HKVqrOZmyfkr4LEbIXv4HNWkWpCl5oJvT-Qhak9CT2G1PDfgZ_nnVFRSKj11lNLo45ME0_x29fMGlgHAFs05qndj7tFXKFrN55A6D_-KFjJOryjVW8HXnpbtiN05pvxwKWn2p1y6QN7tsavAw11i5SbFyooKp3mUst_LnlLmI4YUziYnzFZn1tCSHnDxRS33cjO48Q44DjEe6Jhahey-08axvixeh0fFz1d6TNUla0JqzBW8TuCEWHsMHxSIJusYup98HnIvjQ
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * accept-language: en-US
 * cookie: 
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "req_y59Z3wYQo-L1lIGkteMTg");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=D559BE0ADE72CDF8908DAA5329B39650; Path=/"]);
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9993");
  res.setHeader("x-rate-limit-reset", "1508785218");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Mon, 23 Oct 2017 18:59:36 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJzdWIiOiIwMHVveHhxcXhpWFpRM3htWDBnMyIsIm5hbWUiOiJHZW9yZ2UgV2FzaGluZ3RvbiIsImxvY2FsZSI6ImVuLVVTIiwiZW1haWwiOiJnZW9yZ2VAYWNtZS5jb20iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJnZW9yZ2VAYWNtZS5jb20iLCJnaXZlbl9uYW1lIjoiR2VvcmdlIiwiZmFtaWx5X25hbWUiOiJXYXNoaW5ndG9uIiwiem9uZWluZm8iOiJBbWVyaWNhL0xvc19BbmdlbGVzIiwidXBkYXRlZF9hdCI6MTUwODcyNjQ0OSwiZW1haWxfdmVyaWZpZWQiOnRydWV9", "base64"));
  res.end();

  return __filename;
};
