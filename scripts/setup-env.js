/* eslint-disable consistent-return, no-console */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Users can also provide the testenv configuration at the root folder
require('dotenv').config({ path: path.join(__dirname, '..', 'testenv') });

function validateConfig() {
  if (!process.env.ISSUER || !process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.USERNAME || !process.env.PASSWORD) {
    console.log('[ERROR] Please set the necessary Environment variables (ISSUER, CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD)');
    process.exit(1);
  }
}

function cloneRepository(repository, directory, branch='master') {
  const dir = path.join(__dirname, '..', directory);
  if (fs.existsSync(dir)) {
    console.log(`${directory} is already cloned. Getting latest version...`);
    execSync(`cd ${directory} && git pull`)
    return;
  }

  const command = `git clone --single-branch --branch ${branch} ${repository}`;
  console.log(`Cloning repository ${directory}`);
  execSync(command);
}

function installDependencies(directory) {
  const dir = path.resolve(__dirname, '..', directory);
  execSync(`cd ${dir} && npm install`);
}

validateConfig();
cloneRepository('https://github.com/okta/okta-oidc-tck.git', 'okta-oidc-tck', 'jp-e2e-deps');
installDependencies('okta-oidc-tck/e2e-tests');
