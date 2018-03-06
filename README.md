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

Before running the tests locally, install all the dependencies
```bash
npm install
```
Then you need to setup the following environment variables

```bash
export ISSUER=https://{yourOktaDomain}.com/oauth2/default
export CLIENT_ID={yourAppClientId}
export CLIENT_SECRET={yourAppClientSecret}
export SPA_CLIENT_ID={yourSPAClientId}
```

After setting up the environment variables, you need to run a script to update the configuration

```bash
sh scripts/update-samples-config.sh
```
A final step is update the following environment variables with username & password of the user you want to use in your tests

Note that the USERNAME should be of the form "username@email.com"

```bash
export USERNAME={userName}
export PASSWORD={password}
```

Then run the E2E tests:

```bash
npm test
```
