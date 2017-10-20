# AngularJS 1.x and express-4 Sample Application

> Note: This version of Express back-end ships with our [Angular 1 front-end sample](https://github.com/okta/samples-js-angular-1). It is not not compatible with the [React front-end sample](https://www.npmjs.com/package/@okta/samples-js-react) and [Elm front-end sample](https://www.npmjs.com/package/@okta/samples-elm).
To use this Express sample with the React and Elm front-end samples, please use [previous version](https://github.com/okta/samples-nodejs-express-4/tree/release) and follow the instruction [here](https://github.com/okta/samples-nodejs-express-4/tree/release#using-a-different-front-end)

### Table of Contents

  - [Introduction](#introduction)
    - [Login Redirect](#1-login-redirect)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Front End](#front-end)
    - [Login Redirect](#login-redirect)
    - [Using a different front-end](#using-a-different-front-end)
  - [Back End](#back-end)
    - [Routes](#routes)
    - [Handle the Redirect](#handle-the-redirect)
    - [Logout](#logout)
  - [Conclusion](#conclusion)
  - [Support](#support)
  - [License](#license)
  
## Introduction

This tutorial will demonstrate how to use OAuth 2.0 and OpenID Connect to add authentication to a NodeJs/express-4 application.
> Note: This version of Express sample demonstrates the [Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-1.3.1) via redirect to Okta org URL. Support for Custom Login Form will be added in a future release.  


### 1. Login Redirect

Users are redirected to your Okta organization for authentication.

<img src="docs/assets/redirect.png" width="300" />

After logging into your Okta organization, an authorization code is returned in a callback URL. This authorization code is then exchanged for an `id_token`.

## Prerequisites

This sample app depends on [Node.js](https://nodejs.org/en/) for front-end dependencies and some build scripts - if you don't have it, install it from [nodejs.org](https://nodejs.org/en/).

```bash
# Verify that node is installed
$ node -v
```

Then, clone this sample from GitHub and install the front-end dependencies:
```bash
# Clone the repo and navigate to the samples-nodejs-express-4 dir
$ git clone git@github.com:okta/samples-nodejs-express-4.git && cd samples-nodejs-express-4

# Install the front-end dependencies
[samples-nodejs-express-4]$ npm install
```

## Quick Start

Start the back-end for your sample application with `npm start`. This will start the app server on [http://localhost:3000](http://localhost:3000).

By default, this application uses a mock authorization server which responds to API requests like a configured Okta org - it's useful if you haven't yet set up OpenID Connect but would still like to try this sample. 

To start the mock server, run the following in a second terminal window:
```bash
# Starts the mock Okta server at http://127.0.0.1:7777
[samples-nodejs-express-4]$ npm run mock-okta
```

You can create your own Okta org by signing up for a [free Developer Account](https://developer.okta.com/signup/)

If you'd like to test this sample against your own Okta org, navigate to the Okta Developer Dashboard and follow these steps:

1. Create a new **Web** application by clicking **Add Application** and selecting **Web** from the *Applications* page.		
2. After accepting the default configuration, click **Done** to redirect back to the *General Settings* of your application.		
3. Copy the **Client ID** and **Client Secret**, as it will be needed for the client configuration.
4. Finally, navigate to `https://{yourOktaDomain}.com/api/v1/authorizationServers/default` to see if the [Default Authorization Server](https://developer.okta.com/docs/api/resources/oauth2.html#using-the-default-authorization-server) is setup. If not, [let us know](mailto:developers@okta.com).
Then, replace the *oidc* settings in `.samples.config.json` to point to your new app:
```javascript
// .samples.config.json
{
  "oidc": {
    "oktaUrl": "https://{{yourOktaDomain}}.com",
    "issuer": "https://{{yourOktaDomain}}.com/oauth2/default",
    "clientId": "{{yourClientId}}",
    "clientSecret": "{{yourClientSecret}}",
    "redirectUri": "http://localhost:3000/authorization-code/callback"
  }
}
```

## Front-end

When you start this sample, the [AngularJS 1.x UI](https://github.com/okta/samples-js-angular-1) is copied into the `dist/` directory. More information about the AngularJS controllers and views are available in the [AngularJS project repository](https://github.com/okta/samples-js-angular-1/blob/master/README.md).

### Login Redirect

> Note: The middleware library [okta oidc-middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware) is used by the Express back-end to handle the [Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-1.3.1) 

With AngularJS, we include the template directive `ng-click` to begin the login process. When the link is clicked, it calls the `login()` function which simply redirects the client to `/login` URL. 

In this sample, the [okta oidc-middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware) library is configured to use the values in `.samples.config.json`. When the `login()` function is called from the view, the middleware library calls the [`/authorize`](http://developer.okta.com/docs/api/resources/oauth2.html#authentication-request) endpoint to start the [Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-1.3.1).

You can read more about the `ExpressOIDC` configuration options here: [OpenID Connect with Okta oidc-middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware#new-expressoidcconfig).

**Important:** When the authorization code is exchanged for an `access_token` and/or `id_token`, the tokens **must** be [validated](#validation). The middleware library handles this validation on the client's behalf.

## Back-end
To display the user information and handle session close, your back-end server performs the following tasks:
  - Handle the callback from [okta oidc-middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware) after authentication
  - Render the user profile information returned by the middleware library
  - Log the user out

> Note: As you can see, the back-end has delegated handling the authorization code exchange, token validation, getting the userinfo etc to [okta oidc-middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware).
In the earlier version of this sample, the back-end performed all the heavy lifting right from token exchange, validation to setting the user session.

### Routes
To render the AngularJS templates, we define the following express-4 routes:

| Route                                 | Description                                                 |
| ------------------------------------- | ----------------------------------------------------------- |
| **authorization-code/**               | index page, also handles redirect from middleware           |
| **authorization-code/login-redirect** | renders the [login redirect](#login-redirect) flow          |
| **authorization-code/profile**        | renders the logged in state, displaying profile information |
| **authorization-code/logout**         | closes the `user` session                                   |

### Handle the Redirect
After successful authentication, we get information about the authenticated user in `req.userinfo` object.
Below is the code that handles the redirect back after successful authentication:

```javascript
// route-handlers.js
handlers.scenarios = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect(302, '/authorization-code/profile');
    return;
  }
  res.render('overview', { config });
};

handlers.profile = (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect(302, '/');
    return;
  }
  res.render('profile', { user: req.userinfo, config });
};
```
### Logout
We can logout the user from the session using the [okta oidc-middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware) 

```javascript
// route-handlers.js
handlers.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
```

## Conclusion
You have now successfully authenticated with Okta! Now what? With the `req.userinfo` object, you have basic claims into the user's identity. You can extend the set of claims by modifying the `response_type` and `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `phone_number`, `groups`, and [more](http://developer.okta.com/docs/api/resources/oidc.html#scopes).

## Support

Have a question or see a bug? Email developers@okta.com. For feature requests, feel free to open an issue on this repo. If you find a security vulnerability, please follow our [Vulnerability Reporting Process](https://www.okta.com/vulnerability-reporting-policy/).

## License

Copyright 2017 Okta, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
