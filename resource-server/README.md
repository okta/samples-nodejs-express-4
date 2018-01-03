# Express.js Resource-Server Example

This sample application uses the [Okta JWT Verifier][] library to authenticate requests against your Express application, using access tokens.

The access tokens are obtained via the [Implicit Flow][].  As such, you will need to use one of our front-end samples with this project.  It is the responsibility of the front-end to authenticate the user, then use the obtained access tokens to make requests of this resource server.


## Prerequisites

Before running this sample, you will need the following:

* An Okta Developer Org, you can sign up for one at https://developer.okta.com/signup/.
* An OIDC application in your Org, configured for Singe-Page-App mode. You can find instructions [here][OIDC SPA Setup Instructions].  When following the wizard, use the default properties.  They are are designed to work with our sample applications.
* One of our front-end sample applications:
  * [Okta Angular Sample Apps][]
  * [Okta React Sample Apps][]

## Running This Example

To run this application, you first need to clone this repo and then enter into this directory:

```bash
git clone git@github.com:okta/samples-nodejs-express-4.git
cd samples-nodejs-express-4/resource-server
```

Then install dependencies:

```bash
npm install
```

You will need to provide the issuer, client ID and audience to the sample server. This setting can be found in the Developer Console, when looking at the Application that you created.  Place this configuration into the file `.samples.config.json` in this folder:

```
{
  "oktaSample": {
    "oidc": {
      "aud": "api://default",
      "clientId: "{yourClientId}",
      "issuer": "https://{yourOktaDomain}.com/oauth2/default"
    },
    "server": {
      "port": 8080
    }
  }
}

```

Now you should be able to run the resource server:

```
npm start
```

At this point you should be able to navigate to http://localhost:8080

If you see a basic welcome message, then things are working!  At this point you should open a new terminal window and run the front-end sample project.  Once the front-end sample is running, you should be able to visit http://localhost:8000 and be presented with login information.

[Okta Angular Sample Apps]: https://github.com/okta/samples-js-angular
[Okta React Sample Apps]: https://github.com/okta/samples-js-react
[Okta JWT Verifier]: https://www.npmjs.com/package/@okta/jwt-verifier
[OIDC SPA Setup Instructions]: https://developer.okta.com/authentication-guide/implementing-authentication/implicit#1-setting-up-your-application

[Implicit Flow]: https://developer.okta.com/authentication-guide/implementing-authentication/implicit

