var path = require("path");

/**
 * POST /oauth2/v1/token?grant_type=authorization_code&code=ZyZnIfmPNIKxWAux1jsy&redirect_uri=http://localhost:3000/authorization-code/callback
 *
 * authorization: Basic: NVZObTF4WjZ0bnI4YURlR3JIV2Y6bm9SR08wZGJXR044cWFWb05sLTBQakVRQXRyc0IxOHU0cGJtOTZ5Mg==
 * content-type: application/x-www-form-urlencoded
 * host: rain.okta1.com:1802
 * content-length: 0
 * connection: close
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept-language: en-US
 * accept-encoding: gzip
 * cookie: 
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqUpIrDEBsTZ6mMY5xpSc6Lg");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9994");
  res.setHeader("x-rate-limit-reset", "1478388288");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=06B4BD8D8F9604737C7515F357131EF0; Path=/"]);
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:49 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWpZME5rMXpRVVpFVWxnMWNWSlBNVXB6VFZFd2FXZFpPVFZsYm1SbWRYazFaMVpMVmpaM1lXcGtlRzhpZlEuZXlKMlpYSWlPakVzSW1wMGFTSTZJa0ZVTGxwalZqWjBWbHBXV2pabVJ6SnVVelkxTkhOSU5XdFVURVowY25oS1ltczBURWg2TWtneU9XSnhRMjhpTENKcGMzTWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaTl2WVhWMGFESXZiM0p6YTNOc1UwUjVWakV3V1hCNFN6RXdaek1pTENKaGRXUWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaUlzSW5OMVlpSTZJbWRsYjNKblpVQmhZMjFsTG1OdmJTSXNJbWxoZENJNk1UUTNPRE00T0RJek1Dd2laWGh3SWpveE5EYzRNemt4T0RNd0xDSmphV1FpT2lJMVZrNXRNWGhhTm5SdWNqaGhSR1ZIY2toWFppSXNJblZwWkNJNklqQXdkV3Q2TkhsYVZXZHBSekJNU1c5U01HY3pJaXdpYzJOd0lqcGJJbTl3Wlc1cFpDSXNJbVZ0WVdsc0lsMTkuS3MyTWhnSGllWGFocHNxWjdaNjR3NTFGM2o0cmMzOTAxLVNPZkNIMVBwb1QyakYyN3laWXRUZ3otdGVZd2RUc2U1MExIbk9FUGpzWVFKM19KTmFBV2RFaXVBbnhZdlh4UXN5LTViUFU4dmhxdDNjc1V3QVJCTjRBTTFibFBiNUVhTlZNQ2pJc0hCZmtnYU1tTi1rQzNPTEQzZWVwQ0NvSWdWbjZuN0lfYzZWckJnYVpEdjFWOHFJVW5KNVFnVVZ1anZXX2tPcG9vYnJ3TURMQ1NCNWtpNWtLejZlR0ZNeTJJT1QzMnBKTEVGYUJFelg3R2FENFJWeHlSQlhpOUpFOWx6U3ZtWlMydGZ3VlRJak95S1dZZXNwdi1iSEZ2eGMtcGZSdGx2SS1XbVdBMFhfTTk1aEtqSlZ6VENNMVhJcGpfTzZwZFJzNkVwYkZpXy1xZGtYME9RIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImV4cGlyZXNfaW4iOjM2MDAsInNjb3BlIjoib3BlbmlkIGVtYWlsIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW1GV2JuQnZNMFZMZUZFMVRFZzRYMVZXUmpCNFQzTkdTR0phVWxsNk0zTlVhRVF4WjBOUlVrTnNSazBpZlEuZXlKemRXSWlPaUl3TUhWcmVqUjVXbFZuYVVjd1RFbHZVakJuTXlJc0ltVnRZV2xzSWpvaVoyVnZjbWRsUUdGamJXVXVZMjl0SWl3aWRtVnlJam94TENKcGMzTWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaUlzSW1GMVpDSTZJalZXVG0weGVGbzJkRzV5T0dGRVpVZHlTRmRtSWl3aWFXRjBJam94TkRjNE16ZzRNak13TENKbGVIQWlPakUwTnpnek9URTRNekFzSW1wMGFTSTZJa2xFTGpVME5sQnplbGxZUzFKU2VIWnlkM1JqTFRJNFdrOUJSa1JyU0c1ek5rNDVWelUzTjFVMGVXTm5lRVVpTENKaGJYSWlPbHNpY0hka0lsMHNJbWxrY0NJNklqQXdiMnR2YzJGV1NsQlpTbXRUZDFack1HY3pJaXdpYm05dVkyVWlPaUpPVDA1RFJTSXNJbUYxZEdoZmRHbHRaU0k2TVRRM09ETTRPREl6TUN3aVlYUmZhR0Z6YUNJNklrRldZVTlSU21zd0xXSnFTMng2ZWt4VFpGQk1hWGNpZlEuTFQ4Q0pReldxbzlULUxxblZGdGFtTDc5WUw5Zk91bGM3SFlWZldyVG1FT0JONVY0ang1emdiUTZ2MXh2X1p6YTRVT1JSanR2d3F0WEJtOFdyaWVlSXNGeWJDeVE1YUNLMWllNUlhb3ZQR1NiSWI4cUN1Q1ZNZHRmMU9HU0hxWXd4RndBZTVscm91dURCWVNoWG1wM3dKZ25Fb3Faa1V1NjFzb0RiM052cmRBLUQzRW1oLWt2U0hFUDJfUjNCM2NybWkzc2ROOXFDWXdEc0k3SHp6dUdNMFk0UmFEb0F5NlBjbGpBTUYwZi1GUmxYRUN5V3FGVkxoWUVBdENPQ0FQVHhoSHlRVEVfbWU4d1hBcUlhaUpjelVqTENWRlc0SzBuWE1FZGxIanNpY3AwSmowbnpnQnJYN3o1cGhPSnFWbHBQQmxxbER5eEF0ZElibjBlWHNUckh3In0=", "base64"));
  res.end();

  return __filename;
};
