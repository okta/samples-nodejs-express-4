var path = require("path");

/**
 * POST /oauth2/default/v1/token
 *
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept-encoding: gzip
 * accept: application/json
 * authorization: Basic MG9hcDQ0Z3N2WFVpdEJaU3YwZzM6eVcwaHlRaDJaTkxjcnlyNW4xQmlCQ2NTQUZqRkRTV3dfWFlOVWdCMA==
 * content-type: application/x-www-form-urlencoded
 * content-length: 142
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
  res.setHeader("x-okta-request-id", "reqBIYDQeZtT0SXO4-vrgbRBQ");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=9767249442BF247F31FEFF05175E6E42; Path=/"]);
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9994");
  res.setHeader("x-rate-limit-reset", "1508785218");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Mon, 23 Oct 2017 18:59:36 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWtoM01sVlhWeTE1WjBGQ01WWTJaRlYxTUhoMlFrMTRSSG81VlVGWmEzQXdXRkJTY214UFgyZEhSRWtpZlEuZXlKMlpYSWlPakVzSW1wMGFTSTZJa0ZVTGxjNFVUUnNjbXRQYUU5b2VUZExXbDl3WkhobmJFaFZkRkYxZGpKNVYyUTBXa3d4TVRNeVVXbEtaa2tpTENKcGMzTWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaTl2WVhWMGFESXZaR1ZtWVhWc2RDSXNJbUYxWkNJNkltRndhVG92TDJSbFptRjFiSFFpTENKcFlYUWlPakUxTURnM09EVXhOellzSW1WNGNDSTZNVFV3T0RjNE9EYzNOaXdpWTJsa0lqb2lNRzloY0RRMFozTjJXRlZwZEVKYVUzWXdaek1pTENKMWFXUWlPaUl3TUhWdmVIaHhjWGhwV0ZwUk0zaHRXREJuTXlJc0luTmpjQ0k2V3lKd2NtOW1hV3hsSWl3aWIzQmxibWxrSWl3aVpXMWhhV3dpWFN3aWMzVmlJam9pWjJWdmNtZGxRR0ZqYldVdVkyOXRJbjAuUlBjRWVnWG1CQ2U4VWg0OTBjRnU5d29XZ0YzRUNENGNhVmhPYUlla05ZWkh1dENHb3NLc05YVTFCcjgwMDdmTkoxR29OQ2ZDalkwNEhLVnFyT1pteWZrcjRMRWJJWHY0SE5Xa1dwQ2w1b0p2VC1RaGFrOUNUMkcxUERmZ1pfbm5WRlJTS2oxMWxOTG80NU1FMF94MjlmTUdsZ0hBRnMwNXFuZGo3dEZYS0ZyTjU1QTZEXy1LRmpKT3J5alZXOEhYbnBidGlOMDVwdnh3S1duMnAxeTZRTjd0c2F2QXcxMWk1U2JGeW9vS3AzbVVzdF9MbmxMbUk0WVV6aVluekZabjF0Q1NIbkR4UlMzM2NqTzQ4UTQ0RGpFZTZKaGFoZXktMDhheHZpeGVoMGZGejFkNlROVWxhMEpxekJXOFR1Q0VXSHNNSHhTSUp1c1l1cDk4SG5JdmpRIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImV4cGlyZXNfaW4iOjM2MDAsInNjb3BlIjoicHJvZmlsZSBvcGVuaWQgZW1haWwiLCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJa2gzTWxWWFZ5MTVaMEZDTVZZMlpGVjFNSGgyUWsxNFJIbzVWVUZaYTNBd1dGQlNjbXhQWDJkSFJFa2lmUS5leUp6ZFdJaU9pSXdNSFZ2ZUhoeGNYaHBXRnBSTTNodFdEQm5NeUlzSW01aGJXVWlPaUpIWlc5eVoyVWdWMkZ6YUdsdVozUnZiaUlzSW1WdFlXbHNJam9pWjJWdmNtZGxRR0ZqYldVdVkyOXRJaXdpZG1WeUlqb3hMQ0pwYzNNaU9pSm9kSFJ3T2k4dmNtRnBiaTV2YTNSaE1TNWpiMjA2TVRnd01pOXZZWFYwYURJdlpHVm1ZWFZzZENJc0ltRjFaQ0k2SWpCdllYQTBOR2R6ZGxoVmFYUkNXbE4yTUdjeklpd2lhV0YwSWpveE5UQTROemcxTVRjMkxDSmxlSEFpT2pFMU1EZzNPRGczTnpZc0ltcDBhU0k2SWtsRUxtcFVVSGx1Y1hJdFNXWlJUbFZEWmxoRE9VWmFXbEV5Ykhoc2REYzBPRjlWZURsWFVIaDBTM1JtYjBFaUxDSmhiWElpT2xzaWNIZGtJbDBzSW1sa2NDSTZJakF3YjI5b1luTmtVRzA0YTJ4blV6VlVNR2N6SWl3aWNISmxabVZ5Y21Wa1gzVnpaWEp1WVcxbElqb2laMlZ2Y21kbFFHRmpiV1V1WTI5dElpd2lZWFYwYUY5MGFXMWxJam94TlRBNE56ZzFNVGMwTENKaGRGOW9ZWE5vSWpvaWNHTnlWR1pMVDBKNUxVVlBUMEZOVG1kTVRYQXhkeUo5LkZaRldsWG1MYnRKZ2J1MlBMeWFTampGQjF0clNrd1RRM1I0WXV1UHU3RUVpTnpRZ1RBQS12Z1dubmNGdXNLWVgteE9yMnRiOW9vNHp6YlljQWdwNEpTMU9sNm1iR0lFTUYxSDV1RmdkNDg4XzhsckRFT3RXM1Z2c3BqNDA2LURZSGJfX0dXdmhpS3FIQ0tpRFlBQTl3RFJEcXZ0bmZMVWVtbVZUOV9xZDdIN05VVGN4aVRQUE42Z3NjM256bWpFVUNOSlNOOWlGNy1mczdtX2ZZVk45dXN0amVwaXcwSDE3TDc1UGkwTnU2S2V6V2hDSEdYaXdWdlVKbk1IVEpFdFFaNm1UTzVHYkFpQldOd0NHWGxHS3c1UHlYcFhuc3ppd1g3WTFlV1pCQzRIUldJOExLbE5BM0tBRGNEM0RsT2NKQlVPcEcwVDBIS2tneXgwckpKTzVGZyJ9", "base64"));
  res.end();

  return __filename;
};
