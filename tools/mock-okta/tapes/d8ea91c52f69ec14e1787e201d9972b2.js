var path = require("path");

/**
 * GET /oauth2/default/v1/userinfo
 *
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept-encoding: gzip
 * accept: application/json
 * authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InBSMURJQVNFcUxNdDh4NHd0Wk5NcmR3TjBiQ2FTOEdnTFZwS3g1ZlJWeUkifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlE4RUpkMFU4UUsxbmxHZ09zRmNBbENOWFJPWVJ5V1dDMFNkczd1OVhqcmMiLCJpc3MiOiJodHRwOi8vcmFpbi5va3RhMS5jb206MTgwMi9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE1MDczMjA1MTAsImV4cCI6MTUwNzMyNDExMCwiY2lkIjoiMG9hb3V2dFkwMWFkTzk2WjAwZzMiLCJ1aWQiOiIwMHVvc3NPa0pqekFFSjl1SjBnMyIsInNjcCI6WyJlbWFpbCIsIm9wZW5pZCIsInByb2ZpbGUiXSwic3ViIjoiZ2VvcmdlQGFjbWUuY29tIn0.BMRA6FuC4yj-x7_UfCBntGNNri-Bhe6zFh17x_6nc1xgEL3FhEt8lUl5wTn9lIK1MNd_zoCEFbIdIEJu7Vmc11dVwaTVdKTXQU_0JpfniwOuc6foF_OYSByAfzE8VEgldI8TZtD29ZQ3StcuqQ-swt5KyAAahH94FTAXU7EStm2cr4to6mskL-Gp4u7HMUrjMRqVc5bLKkHs27Cb65eBRmhzPhTquWN_1NBZbSPOLjssvuV-g8sDWdpcHyt3geAk5K1WBEZG9s0BZyf39cZ6Jgws7HWEgNf9hbZsuIeDfwX9pLDUQ_uPj3fJOSLFWYjqLYXFm_SU6RJy42nLaCrsJA
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
  res.setHeader("x-okta-request-id", "reqOeaOZrTgSmmqG30QkwTE6g");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=8964AE9F9DB04497E86BE565A4469A73; Path=/"]);
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9993");
  res.setHeader("x-rate-limit-reset", "1507320552");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Fri, 06 Oct 2017 20:08:30 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJzdWIiOiIwMHVvc3NPa0pqekFFSjl1SjBnMyIsIm5hbWUiOiJHZW9yZ2UgV2FzaGluZ3RvbiIsImxvY2FsZSI6ImVuLVVTIiwiZW1haWwiOiJnZW9yZ2VAYWNtZS5jb20iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJnZW9yZ2VAYWNtZS5jb20iLCJnaXZlbl9uYW1lIjoiR2VvcmdlIiwiZmFtaWx5X25hbWUiOiJXYXNoaW5ndG9uIiwiem9uZWluZm8iOiJBbWVyaWNhL0xvc19BbmdlbGVzIiwidXBkYXRlZF9hdCI6MTUwNzMxMTgzMSwiZW1haWxfdmVyaWZpZWQiOnRydWV9", "base64"));
  res.end();

  return __filename;
};
