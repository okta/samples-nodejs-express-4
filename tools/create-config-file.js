/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

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
