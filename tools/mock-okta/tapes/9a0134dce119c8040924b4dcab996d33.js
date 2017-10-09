var path = require("path");

/**
 * GET /oauth2/default/.well-known/openid-configuration
 *
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept-encoding: gzip
 * accept: application/json
 * host: rain.okta1.com:1802
 * connection: close
 * accept-language: en-US
 * cookie: 
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqLb7TDquHQFWJm-1lP6-FnA");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=F494B238B19C47DF6C43D0C4B2269896; Path=/"]);
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9999");
  res.setHeader("x-rate-limit-reset", "1507320552");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Fri, 06 Oct 2017 20:08:12 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJpc3N1ZXIiOiJodHRwOi8vcmFpbi5va3RhMS5jb206MTgwMi9vYXV0aDIvZGVmYXVsdCIsImF1dGhvcml6YXRpb25fZW5kcG9pbnQiOiJodHRwOi8vcmFpbi5va3RhMS5jb206MTgwMi9vYXV0aDIvZGVmYXVsdC92MS9hdXRob3JpemUiLCJ0b2tlbl9lbmRwb2ludCI6Imh0dHA6Ly9yYWluLm9rdGExLmNvbToxODAyL29hdXRoMi9kZWZhdWx0L3YxL3Rva2VuIiwidXNlcmluZm9fZW5kcG9pbnQiOiJodHRwOi8vcmFpbi5va3RhMS5jb206MTgwMi9vYXV0aDIvZGVmYXVsdC92MS91c2VyaW5mbyIsInJlZ2lzdHJhdGlvbl9lbmRwb2ludCI6Imh0dHA6Ly9yYWluLm9rdGExLmNvbToxODAyL29hdXRoMi92MS9jbGllbnRzIiwiandrc191cmkiOiJodHRwOi8vcmFpbi5va3RhMS5jb206MTgwMi9vYXV0aDIvZGVmYXVsdC92MS9rZXlzIiwicmVzcG9uc2VfdHlwZXNfc3VwcG9ydGVkIjpbImNvZGUiLCJpZF90b2tlbiIsImNvZGUgaWRfdG9rZW4iLCJjb2RlIHRva2VuIiwiaWRfdG9rZW4gdG9rZW4iLCJjb2RlIGlkX3Rva2VuIHRva2VuIl0sInJlc3BvbnNlX21vZGVzX3N1cHBvcnRlZCI6WyJxdWVyeSIsImZyYWdtZW50IiwiZm9ybV9wb3N0Iiwib2t0YV9wb3N0X21lc3NhZ2UiXSwiZ3JhbnRfdHlwZXNfc3VwcG9ydGVkIjpbImF1dGhvcml6YXRpb25fY29kZSIsImltcGxpY2l0IiwicmVmcmVzaF90b2tlbiIsInBhc3N3b3JkIl0sInN1YmplY3RfdHlwZXNfc3VwcG9ydGVkIjpbInB1YmxpYyJdLCJpZF90b2tlbl9zaWduaW5nX2FsZ192YWx1ZXNfc3VwcG9ydGVkIjpbIlJTMjU2Il0sInNjb3Blc19zdXBwb3J0ZWQiOlsib3BlbmlkIiwiZW1haWwiLCJwcm9maWxlIiwiYWRkcmVzcyIsInBob25lIiwib2ZmbGluZV9hY2Nlc3MiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2RzX3N1cHBvcnRlZCI6WyJjbGllbnRfc2VjcmV0X2Jhc2ljIiwiY2xpZW50X3NlY3JldF9wb3N0IiwiY2xpZW50X3NlY3JldF9qd3QiLCJub25lIl0sImNsYWltc19zdXBwb3J0ZWQiOlsiaXNzIiwidmVyIiwic3ViIiwiYXVkIiwiaWF0IiwiZXhwIiwianRpIiwiYXV0aF90aW1lIiwiYW1yIiwiaWRwIiwibm9uY2UiLCJuYW1lIiwibmlja25hbWUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiLCJnaXZlbl9uYW1lIiwibWlkZGxlX25hbWUiLCJmYW1pbHlfbmFtZSIsImVtYWlsIiwiZW1haWxfdmVyaWZpZWQiLCJwcm9maWxlIiwiem9uZWluZm8iLCJsb2NhbGUiLCJhZGRyZXNzIiwicGhvbmVfbnVtYmVyIiwicGljdHVyZSIsIndlYnNpdGUiLCJnZW5kZXIiLCJiaXJ0aGRhdGUiLCJ1cGRhdGVkX2F0IiwiYXRfaGFzaCIsImNfaGFzaCJdLCJjb2RlX2NoYWxsZW5nZV9tZXRob2RzX3N1cHBvcnRlZCI6WyJTMjU2Il0sImludHJvc3BlY3Rpb25fZW5kcG9pbnQiOiJodHRwOi8vcmFpbi5va3RhMS5jb206MTgwMi9vYXV0aDIvZGVmYXVsdC92MS9pbnRyb3NwZWN0IiwiaW50cm9zcGVjdGlvbl9lbmRwb2ludF9hdXRoX21ldGhvZHNfc3VwcG9ydGVkIjpbImNsaWVudF9zZWNyZXRfYmFzaWMiLCJjbGllbnRfc2VjcmV0X3Bvc3QiLCJjbGllbnRfc2VjcmV0X2p3dCIsIm5vbmUiXSwicmV2b2NhdGlvbl9lbmRwb2ludCI6Imh0dHA6Ly9yYWluLm9rdGExLmNvbToxODAyL29hdXRoMi9kZWZhdWx0L3YxL3Jldm9rZSIsInJldm9jYXRpb25fZW5kcG9pbnRfYXV0aF9tZXRob2RzX3N1cHBvcnRlZCI6WyJjbGllbnRfc2VjcmV0X2Jhc2ljIiwiY2xpZW50X3NlY3JldF9wb3N0IiwiY2xpZW50X3NlY3JldF9qd3QiLCJub25lIl0sImVuZF9zZXNzaW9uX2VuZHBvaW50IjoiaHR0cDovL3JhaW4ub2t0YTEuY29tOjE4MDIvb2F1dGgyL2RlZmF1bHQvdjEvbG9nb3V0In0=", "base64"));
  res.end();

  return __filename;
};
