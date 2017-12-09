/**
 * This is run after running `npm install` inside any of the samples
 */

// This creates a boilerplate config file for you

const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), '.samples.config.json');

module.exports = function createConfigFile(sampleConfig) {
  if (!fs.existsSync(file)) {
    console.log('Creating default configuration file');
    fs.writeFileSync(file, JSON.stringify(sampleConfig, '\n', 2) + '\n');
  }
};
