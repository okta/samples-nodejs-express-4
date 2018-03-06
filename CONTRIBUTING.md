# Contributing to Okta Open Source Repos

## Style

### Git Commit Messages

We use a simplified form of [Atom's](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages) commit convention.

  * Use the present tense ("Adds feature" not "Added feature")
  * Limit the first line to 72 characters or less
  * Add one feature per commit. If you have multiple features, have multiple commits.

#### Template

    <emoji> Short Description of Commit
    <BLANKLINE>
    More detailed description of commit
    <BLANKLINE>
    Resolves: <Jira # or Issue #>

#### Emoji Categories
Our categories include:
  * :seedling: `:seedling:` when creating a new feature
  * :bug: `:bug:` when fixing a bug
  * :white_check_mark: `:white_check_mark:` when adding tests
  * :art: `:art:` when improving the format/structure of the code
  * :memo: `:memo:` when writing docs
  * :fire: `:fire:` when removing code or files
  * :package: `:package:` when pushing a new release
  * :arrow_up: `:arrow_up:` when upgrading dependencies, or generating files
  * :arrow_down: `:arrow_down:` when downgrading dependencies

If you do not see an exact emoji match, use the best matching emoji.

#### Example
    :memo: Updates CONTRIBUTING.md

    Updates Contributing.md with new emoji categories
    Updates Contributing.md with new template

    Resolves: OKTA-12345

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
