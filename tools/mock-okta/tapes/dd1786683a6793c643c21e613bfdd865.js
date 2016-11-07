var path = require("path");

/**
 * POST /oauth2/v1/token?grant_type=authorization_code&code=hNfpENFeU2jy8uFhxl5g&redirect_uri=http://localhost:3000/authorization-code/callback
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
  res.setHeader("x-okta-request-id", "reqhML6ArP6RR2vQzEbR4Xcgw");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9990");
  res.setHeader("x-rate-limit-reset", "1478388288");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=ECD49230790E33BA331F20F61B17A53B; Path=/"]);
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Sat, 05 Nov 2016 23:23:52 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWpZME5rMXpRVVpFVWxnMWNWSlBNVXB6VFZFd2FXZFpPVFZsYm1SbWRYazFaMVpMVmpaM1lXcGtlRzhpZlEuZXlKMlpYSWlPakVzSW1wMGFTSTZJa0ZVTG14NE1uVktkazlNVDJKRmNsUk5PRlJGYUZkNExWRTRNSGRXVUVOSFVucGhUWEpXYlZoVWIyTnBka2tpTENKcGMzTWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaTl2WVhWMGFESXZiM0p6YTNOc1UwUjVWakV3V1hCNFN6RXdaek1pTENKaGRXUWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaUlzSW5OMVlpSTZJbXB2YUc1QVlXTnRaUzVqYjIwaUxDSnBZWFFpT2pFME56Z3pPRGd5TXpJc0ltVjRjQ0k2TVRRM09ETTVNVGd6TWl3aVkybGtJam9pTlZaT2JURjRXalowYm5JNFlVUmxSM0pJVjJZaUxDSjFhV1FpT2lJd01IVnJlalpGTURaMmRISkhSRlp1T1RCbk15SXNJbk5qY0NJNld5SnZjR1Z1YVdRaUxDSmxiV0ZwYkNJc0luQnliMlpwYkdVaVhYMC5PVkxsOFotYTdkR1ZQZjRMSlR6UG5KNmxhOGFNR3dSM3hjNk0yWWhYVTJqWW12b2tmSXF2cGJWLUxhMHdzMTJ2ekcwbXhqU01kZDdzX3UtcHZyWTVZZjIxLU1aemswRGRUNmw2WjQzN0RWNlY2N2dsSElfWThaU3VSelpXR0duQmlqSklvb3hOT25DYXJVQ2p4elBKNmlCamRnVW5PX1hValI1MENJaTk5cEIxZW53Sk95Q0dKeXZKdEw5aEJUc0Q2NFFBWXZnNWxFODFXZ2NsUzFfU1MxTnNwdURybnVGQTRYOExIamR6T0s3NS1IdkE0RGt1V1QweHpFa0hCbnRoN3Z0REJzMEU0anM1RXJBTFlSNjR4RU9YSGNjd3VJWS1pNTFoaFJWRU5vd0RNNlI3eUVLREdHSUpYN05EeTRuZnNrc3NZUFNSUmVSZGNlTWF5dTBkMkEiLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiZXhwaXJlc19pbiI6MzYwMCwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkltRldibkJ2TTBWTGVGRTFURWc0WDFWV1JqQjRUM05HU0dKYVVsbDZNM05VYUVReFowTlJVa05zUmswaWZRLmV5SnpkV0lpT2lJd01IVnJlalpGTURaMmRISkhSRlp1T1RCbk15SXNJbTVoYldVaU9pSktiMmh1SUVGa1lXMXpJaXdpWlcxaGFXd2lPaUpxYjJodVFHRmpiV1V1WTI5dElpd2lkbVZ5SWpveExDSnBjM01pT2lKb2RIUndPaTh2Y21GcGJpNXZhM1JoTVM1amIyMDZNVGd3TWlJc0ltRjFaQ0k2SWpWV1RtMHhlRm8yZEc1eU9HRkVaVWR5U0ZkbUlpd2lhV0YwSWpveE5EYzRNemc0TWpNeUxDSmxlSEFpT2pFME56Z3pPVEU0TXpJc0ltcDBhU0k2SWtsRUxsaGhValowVURkdlNFdHJkemd4YkZGaFlYQXdRMGxEZVhSSFVIWjRabE5PU0RCbU5IcEtlVEpETVdjaUxDSmhiWElpT2xzaWNIZGtJbDBzSW1sa2NDSTZJakF3YjJ0dmMyRldTbEJaU210VGQxWnJNR2N6SWl3aWJtOXVZMlVpT2lKT1QwNURSU0lzSW5CeVpXWmxjbkpsWkY5MWMyVnlibUZ0WlNJNkltcHZhRzVBWVdOdFpTNWpiMjBpTENKaGRYUm9YM1JwYldVaU9qRTBOemd6T0RneU16SXNJbUYwWDJoaGMyZ2lPaUp1TFVock5rdGlZV2QwWTBSa1lYSkxUMVo1UVV0UkluMC5hYWdCOXdqT3poaVEzMjNqOHJTMFRaWEcwenFXaTJacmlwbVN1RG5zM0xFUW12ZUE3bDVXV3ZqT0NWVDZIb2wwdEltaXhtVUZ6ZlBLbTV0M3RpR1pGel9fWXNscV9FZzBjTVZzWGlnY2FramZqYkdBQ01KSVk5Ri1wQi14dHVENDdIbEt2Q1VlMk1DUjBUdzMwRkFHN2NGZ2k3YWMwQnl6TFdndXJqN0lBZmpLbm5JN2FLRVZlenRSLW90bHllVVpKczFjeWUzVHhURXdXZFA5RWI1MzlPS000YWMybXdCWXhNTjg4bkpORHVRd3RCWV9VOGYzVk8zOHZSem5vQTR1WEwyOUpFYWt4ZmdPOFBTR0RaOFdCYU1aQklhalJlNTRWdEdobDBOaVpOd2tsTUZXMXRaSTZqdkRCbnpXZXRIbWhuSmM0TnhBamtQX0JoaGxRNjU1YXcifQ==", "base64"));
  res.end();

  return __filename;
};
