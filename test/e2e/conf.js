/*!
 * Copyright (c) 2015-2016, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/* eslint import/no-unresolved:0, import/no-extraneous-dependencies:0, no-console:0 */
/* global jasmine */
const jasmineReporters = require('jasmine-reporters');
const childProcess = require('child_process');
const chalk = require('chalk');
const samplesConfig = require('../../.samples.config.json');

/**
 * Starts a child process that resolves when the given msg is found. Useful
 * when starting a standup service whose ready signal is determined by stdout.
 */
function startAndWaitFor(cmd, args, msg, color) {
  const name = `${cmd} ${args.join(' ')}`;
  const normal = chalk[color || 'yellow'];
  const bold = normal.bold.underline;
  console.log(normal(`Running "${name}" and waiting for "${msg}"`));
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(cmd, args, { encoding: 'utf8' });

    child.stdout.on('data', (buffer) => {
      const data = buffer.toString('utf8');
      console.log(normal(data));
      if (msg && data.indexOf(msg) > -1) {
        console.log(bold(`Found "${msg}" for "${name}", resolving`));
        resolve(child);
      }
    });

    child.stderr.on('data', (data) => {
      console.log(normal(`${data}`));
    });

    child.on('close', (code) => {
      console.log(normal(`"${name}" finished with exit code ${code}`));
      if (code) {
        reject();
      } else {
        resolve(child);
      }
    });

    child.on('error', (err) => {
      console.log(bold(`Failed to start ${name}`));
      console.log(bold(err));
      reject(err);
    });
  });
}

const promises = Promise.all([
  startAndWaitFor('npm', ['start'], samplesConfig.server.startSignal, 'green'),
  startAndWaitFor('npm', ['run', 'mock-okta'], 'Proxying:', 'magenta'),
]);

const config = {
  framework: 'jasmine2',
  beforeLaunch() {
    return promises;
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath: 'build2/reports/junit',
      filePrefix: 'results',
    }));
  },
  afterLaunch() {
    return promises.then((childProcesses) => {
      childProcesses.forEach(child => child.kill());
    });
  },
  specs: ['specs/*.js'],
  restartBrowserBetweenTests: false,
  capabilities: {},
};

// Run PhantomJs in Travis, else Chrome
if (process.env.TRAVIS) {
  config.capabilities.browserName = 'phantomjs';
} else {
  config.capabilities.browserName = 'chrome';
}

module.exports.config = config;
