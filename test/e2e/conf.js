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
  capabilities: {
    browserName: 'chrome',
  },
};

module.exports.config = config;
