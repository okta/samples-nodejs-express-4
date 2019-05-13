module.exports = {
    webServer: {
      port: 8080,
      oidc: {
        clientId: '{clientId}',
        clientSecret: '{clientSecret}',
        issuer: 'https://{yourOktaDomain}.com/oauth2/default',
        appBaseUrl: 'http://localhost:8080',
        scope: 'openid profile email',
        testing: {
          disableHttpsCheck: false
        }
      },
    },
    resourceServer: {
      port: 8000,
      oidc: {
        clientId: '{spaClientId}',
        issuer: 'https://{yourOktaDomain}.com/oauth2/default',
        testing: {
          disableHttpsCheck: false
        }
      },
      assertClaims: {
        aud: 'api://default',
        cid: '{spaClientId}'
      }
    }
  };
