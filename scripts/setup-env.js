/* eslint-disable consistent-return, no-console */

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

function updateConfig() {
  if (!process.env.ISSUER || !process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.USERNAME || !process.env.PASSWORD) {
    console.log('[ERROR] Please set the necessary Environment variables (ISSUER, CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD)');
    process.exit(1);
  }

  const file = path.join(__dirname, '..', '.samples.config.json');
  const data = fs.readFileSync(file, 'utf8');
  let result = data.replace(/"cid": "{clientId}"/g, `"cid": "${process.env.SPA_CLIENT_ID}"`)
  result = result.replace(/{clientId}/g, process.env.CLIENT_ID);
  result = result.replace(/{clientSecret}/g, process.env.CLIENT_SECRET);
  result = result.replace(/https:\/\/{yourOktaDomain}.com\/oauth2\/default/g, process.env.ISSUER);
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
