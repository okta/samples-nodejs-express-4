# Express Sample Applications for Okta

This repository contains several sample applications that show you how to integrate various Okta use-cases into your Node.js application that uses the Express framework.

Please find the sample that fits your use-case from the table below.

| Sample | Description | Use-Case |
|--------|-------------|----------|
| [Okta-Hosted Login](/okta-hosted-login) | An application server that uses the hosted login page on your Okta org, then creates a cookie session for the user in the Express application. | Traditional web applications with server-side rendered pages. |
| [Custom Login Page](/custom-login) | An application server that uses the Okta Sign-In Widget on a custom login page within the application, then creates a cookie session for the user in the Express application. | Traditional web applications with server-side rendered pages. |
| [Resource Server](/resource-server) | This is a sample API resource server that shows you how to authenticate requests with access tokens that have been issued by Okta. | Single-Page applications. |

## Running E2E Tests locally

E2E Tests will be run against the Custom Login, Okta-Hosted Login & Resource servers

Before running the tests locally, install all the dependencies in the root of this project:
```bash
npm install
```
To test both samples you will need the following configured in your developer org:
* A web application
* A SPA application
* A test user account with a known username and password.  Note that the USERNAME should be of the form "username@email.com"

Once you have those resources setup, export their details as the following environment variables:

```bash
export ISSUER=https://{yourOktaDomain}.com/oauth2/default
export CLIENT_ID={yourWebAppClientId}
export CLIENT_SECRET={yourWebAppClientSecret}
export SPA_CLIENT_ID={yourSpaAppClientId}
export USERNAME={userName}
export PASSWORD={password}
```

After setting up the environment variables, run this script to copy the configuration into the JSON configuration files:

```bash
sh scripts/update-samples-config.sh
```

Then run the E2E tests:

```bash
npm test
```
