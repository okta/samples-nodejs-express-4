/**
 * This is run after running `npm install` inside any of the samples
 */

// This creates a boilerplate config file for you

const colors = require('colors');
const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), '.samples.config.json');

module.exports = function createConfigFile(sampleConfig) {
  if (!fs.existsSync(file)) {
    console.log('Creating default configuration file');
    fs.writeFileSync(file, JSON.stringify(sampleConfig, '\n', 2) + '\n');
  }
  console.log(colors.green(`\nSample project is ready to go!  Please add your configuration to ${file}, see the README for instructions.\n`));
};
