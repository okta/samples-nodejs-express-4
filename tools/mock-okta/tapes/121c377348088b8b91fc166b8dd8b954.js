var path = require("path");

/**
 * POST /oauth2/default/v1/token
 *
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept-encoding: gzip
 * accept: application/json
 * authorization: Basic MG9hb3V2dFkwMWFkTzk2WjAwZzM6Tzk2MDBhd3A2WURfbFNqRjAzVnp1bWEtWTJfdUo1MHpyWnNmSTdLXw==
 * content-type: application/x-www-form-urlencoded
 * content-length: 173
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
  res.setHeader("x-okta-request-id", "reqgWgvqz85Ts-8P7r8FHtVvg");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=A4E2A342D825ED68CE25E53D442F61A4; Path=/"]);
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9994");
  res.setHeader("x-rate-limit-reset", "1507320552");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Fri, 06 Oct 2017 20:08:30 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5CU01VUkpRVk5GY1V4TmREaDROSGQwV2s1TmNtUjNUakJpUTJGVE9FZG5URlp3UzNnMVpsSldlVWtpZlEuZXlKMlpYSWlPakVzSW1wMGFTSTZJa0ZVTGxFNFJVcGtNRlU0VVVzeGJteEhaMDl6Um1OQmJFTk9XRkpQV1ZKNVYxZERNRk5rY3pkMU9WaHFjbU1pTENKcGMzTWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaTl2WVhWMGFESXZaR1ZtWVhWc2RDSXNJbUYxWkNJNkltRndhVG92TDJSbFptRjFiSFFpTENKcFlYUWlPakUxTURjek1qQTFNVEFzSW1WNGNDSTZNVFV3TnpNeU5ERXhNQ3dpWTJsa0lqb2lNRzloYjNWMmRGa3dNV0ZrVHprMldqQXdaek1pTENKMWFXUWlPaUl3TUhWdmMzTlBhMHBxZWtGRlNqbDFTakJuTXlJc0luTmpjQ0k2V3lKbGJXRnBiQ0lzSW05d1pXNXBaQ0lzSW5CeWIyWnBiR1VpWFN3aWMzVmlJam9pWjJWdmNtZGxRR0ZqYldVdVkyOXRJbjAuQk1SQTZGdUM0eWoteDdfVWZDQm50R05OcmktQmhlNnpGaDE3eF82bmMxeGdFTDNGaEV0OGxVbDV3VG45bElLMU1OZF96b0NFRmJJZElFSnU3Vm1jMTFkVndhVFZkS1RYUVVfMEpwZm5pd091YzZmb0ZfT1lTQnlBZnpFOFZFZ2xkSThUWnREMjlaUTNTdGN1cVEtc3d0NUt5QUFhaEg5NEZUQVhVN0VTdG0yY3I0dG82bXNrTC1HcDR1N0hNVXJqTVJxVmM1YkxLa0hzMjdDYjY1ZUJSbWh6UGhUcXVXTl8xTkJaYlNQT0xqc3N2dVYtZzhzRFdkcGNIeXQzZ2VBazVLMVdCRVpHOXMwQlp5ZjM5Y1o2Smd3czdIV0VnTmY5aGJac3VJZURmd1g5cExEVVFfdVBqM2ZKT1NMRldZanFMWVhGbV9TVTZSSnk0Mm5MYUNyc0pBIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImV4cGlyZXNfaW4iOjM2MDAsInNjb3BlIjoiZW1haWwgb3BlbmlkIHByb2ZpbGUiLCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbkJTTVVSSlFWTkZjVXhOZERoNE5IZDBXazVOY21SM1RqQmlRMkZUT0VkblRGWndTM2cxWmxKV2VVa2lmUS5leUp6ZFdJaU9pSXdNSFZ2YzNOUGEwcHFla0ZGU2psMVNqQm5NeUlzSW01aGJXVWlPaUpIWlc5eVoyVWdWMkZ6YUdsdVozUnZiaUlzSW1WdFlXbHNJam9pWjJWdmNtZGxRR0ZqYldVdVkyOXRJaXdpZG1WeUlqb3hMQ0pwYzNNaU9pSm9kSFJ3T2k4dmNtRnBiaTV2YTNSaE1TNWpiMjA2TVRnd01pOXZZWFYwYURJdlpHVm1ZWFZzZENJc0ltRjFaQ0k2SWpCdllXOTFkblJaTURGaFpFODVObG93TUdjeklpd2lhV0YwSWpveE5UQTNNekl3TlRFd0xDSmxlSEFpT2pFMU1EY3pNalF4TVRBc0ltcDBhU0k2SWtsRUxqbFRWV1V4T1hBNGRYa3dhVWxIYmkwNFUwaFlTRkpzYVhCQ1MyVlBlR1U1Wm04NVdtRkZiMEZLV1RRaUxDSmhiWElpT2xzaWNIZGtJbDBzSW1sa2NDSTZJakF3YjI5bU5FSnVkVEJPZDJWMVdFMXlNR2N6SWl3aWNISmxabVZ5Y21Wa1gzVnpaWEp1WVcxbElqb2laMlZ2Y21kbFFHRmpiV1V1WTI5dElpd2lZWFYwYUY5MGFXMWxJam94TlRBM016SXdOVEEzTENKaGRGOW9ZWE5vSWpvaVNUTkxRMUJOYUVoSlpqQmZTM2t3Um5sT2RWSjJkeUo5LlNQaHE5N2JNcGs4VUY3NEdGSHpKZVVpSWlNbHB4MTlWVDJhbjhfSGtSSXUxSUNYdnBWeldQNW1HUE5VSElMbEZWdXNPWmFOYjdCX1N6cHBFZ3pWOFg4bFY1QnpnVVd3UjFpaXlTVDctVkV6VHdtX3pFb1BXejM1Mk9pQkZNZzZFZmdJVE44blQ3SU5PTWlzUUFPc19tbGNqeUgta0ZlT3p4d2VBTjZzaFZEN3RmS1lPNHBabVJuYl84REpxbE9Kb21DekZzbWFIRnVwLWdXWE8zWFhJMVdnODhJUFozT0tPaXVPcWMtWmdPSFpSQmY0TExIdDJvS3oydkROMUZNbzRpOXpmYmM3eEFldlVjc2xYSlFyV2FXeld5LWszU3NyU0RMaWV0RWZQXzBhb0tnc1BRVTk0c09DeUdudURsLTZYeXozWE5KZ04xd0tPMnRsMC1HNGNyUSJ9", "base64"));
  res.end();

  return __filename;
};
