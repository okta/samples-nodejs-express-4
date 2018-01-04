# Express.js & Okta-Hosted Login Page Example

This example shows you how to use the [OIDC Middleware Library][] to login a user.  The login is achieved through the [OAuth 2.0 Authorization Code Flow], where the user is redirected to the Okta-Hosted login page.  After the user authenticates, they are redirected back to the application and a local cookie session is created using [express-session][].


## Prerequisites

Before running this sample, you will need the following:

* An Okta Developer Org, you can sign up for one at https://developer.okta.com/signup/.
* An OIDC application in your Org, configured for Web mode. You can find instructions [here][OIDC Web Application Setup Instructions].  When following the wizard, use the default properties.  They are designed to work with our sample applications.

[OIDC Web Application Setup Instructions]: https://developer.okta.com/authentication-guide/implementing-authentication/auth-code#1-setting-up-your-application

[OAuth 2.0 authorization code flow]: https://developer.okta.com/authentication-guide/implementing-authentication/auth-code

## Running This Example

To run this application, you first need to clone this repo and then enter into this directory:

```bash
git clone git@github.com:okta/samples-nodejs-express-4.git
cd samples-nodejs-express-4/
```

Then install dependencies:

```bash
npm install
```

You will need to provide these values to the sample application:

* Client ID
* Client Secret
* Issuer

These settings can be found in the Developer Console.  Place these values into the file `.samples.config.json` that was created for you:

```json
{
  "webServer": {
    "port": 8080,
    "oidc": {
      "clientId": "{yourWebApplicationClientId}",
      "clientSecret": "{yourWebApplicationClientSecret}",
      "issuer": "https://{yourOktaDomain}.com/oauth2/default",
      "redirectUri": "http://localhost:8080/authorization-code/callback"
    },
  }
}

```

Now you should be able to run the app server:

```
npm run okta-hosted-login-server
```

At this point you should be able to navigate to http://localhost:8080

If you see a home page that prompts you to login, then things are working!  When you click the login button you shoud be redirected to the Okta login page, where you will be prompted to login.

You can login with the same account that you created when signing up for your Developer Org, or you can use a known user in your Okta Directory.

**Note:** If you are currently using your Developer Console, you already have a Single Sign-On (SSO) session for your Org.  You will be automatically logged into your application as the same user that is using the Developer Console.

[express-session]: https://github.com/expressjs/session
[OIDC Middleware Library]: https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware
[OAuth 2.0 Authorization Code Flow]: https://developer.okta.com/authentication-guide/implementing-authentication/auth-code