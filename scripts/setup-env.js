/* eslint-disable consistent-return, no-console */

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// Users can also provide the testenv configuration at the root folder
require('dotenv').config({ path: path.join(__dirname, '..', 'testenv') });

function updateConfig() {
  if (!process.env.ISSUER || !process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.USERNAME || !process.env.PASSWORD) {
    console.log('[ERROR] Please set the necessary Environment variables (ISSUER, CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD)');
    process.exit(1);
  }

  const file = path.join(__dirname, '..', '.samples.config.js');
  const data = fs.readFileSync(file, 'utf8');
  let result = data.replace(/https:\/\/{yourOktaDomain}.com\/oauth2\/default/g, process.env.ISSUER);

  if(data.indexOf('{clientId}') >= 0){
    result = result.replace(/{clientId}/g, process.env.CLIENT_ID);
  }

  if(data.indexOf('{clientSecret}') >= 0){
    result = result.replace(/{clientSecret}/g, process.env.CLIENT_SECRET);
  }

  if(data.indexOf('{spaClientId}') >= 0){
    result = result.replace(/{spaClientId}/g, process.env.SPA_CLIENT_ID);
  }

  // Only used for testing to support non-https orgs
  if (process.env.OKTA_TESTING_DISABLEHTTPSCHECK) {
    result = result.replace(/disableHttpsCheck: false/g, 'disableHttpsCheck: true');
  }

  fs.writeFileSync(file, result, 'utf8');
}

function cloneRepository(repository, directory) {
  const dir = path.join(__dirname, '..', directory);
  if (fs.existsSync(dir)) {
    console.log(`${directory} is already cloned.`);
    return;
  }

  const command = `git clone ${repository}`;
  console.log(`Cloning repository ${directory}`);
  exec(command, (err, stdout) => {
    if (err !== null) {
      return console.error(err);
    }
    return console.log(stdout);
  });
}

updateConfig();
cloneRepository('https://github.com/okta/okta-oidc-tck.git', 'okta-oidc-tck');
