# Express Sample Applications for Okta

This repository contains several sample applications that show you how to integrate various Okta use-cases into your Node.js application that uses the Express framework.

## Configuration

All of the samples share a single configuration file, [config.js](config.js). The config uses environment variables which can be either exported in the shell or stored in a file named `testenv` in this directory. See [dotenv](https://www.npmjs.com/package/dotenv) for more details on this file format. It may look something like:

```ini
ISSUER=https://yourOktaDomain.com/oauth2/default

# Web app
CLIENT_ID=123XX
CLIENT_SECRET=456XX

# SPA app
SPA_CLIENT_ID=123YY

```

Please find the sample that fits your use-case from the table below.

| Sample | Description | Use-Case |
|--------|-------------|----------|
| [Okta-Hosted Login](/okta-hosted-login) | An application server that uses the hosted login page on your Okta org, then creates a cookie session for the user in the Express application. | Traditional web applications with server-side rendered pages. |
| [Custom Login Page](/custom-login) | An application server that uses the Okta Sign-In Widget on a custom login page within the application, then creates a cookie session for the user in the Express application. | Traditional web applications with server-side rendered pages. |
| [Resource Server](/resource-server) | This is a sample API resource server that shows you how to authenticate requests with access tokens that have been issued by Okta. | Single-Page applications. |

## Running the tests

Before running the tests you will need to gather values for ALL required environment variables.
You can export these variables in the shell or store them in a file named `testenv` in the current directory.

You will need two Okta applications, one Web app and one SPA app. Save the clientId for the Web app as `CLIENT_ID` and the clientId for the SPA app as `SPA_CLIENT_ID`

The Web app needs a couple of settings in the Developer console:
Add a `Login redirect URI`: `http://localhost:8080/authorization-code/callback`
Add a `Logout redirect URI`: `http://localhost:8080`

You will also need credentials for a test user.

```ini
ISSUER=https://yourOktaDomain.com/oauth2/default
CLIENT_ID=123xxxxx123
CLIENT_SECRET=1234XXX
SPA_CLIENT_ID=123yyyy123
USERNAME=testuser
PASSWORD=testpass
```

With all variables set, run `npm test`
