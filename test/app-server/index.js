/**
 * TODO:
 * x Break this out into test suites
 * x Cleanup console.log statements
 * x Add comments and refactor code to be nicer
 * x Integrate this into the protractor flow. After starting server, run these
 *   tests
 * x Add license headers
 * x Copy over dev-server changes!
 * x Copy over new tests!
 * - Update generator documentation with this flow!
 * x Probably need to fix a lot of linting errors
 * x Generator Tests!!
 * - In PR, add screenshots of what happens
 * - Send PR to Len, Joel, Jordan, and Haisheng
 * - Try this against express repo!
 */

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

require('./spec-list');

const startAndWaitFor = require('../../tools/start-and-wait-for');

const promise = startAndWaitFor('npm', ['run', 'test:mock-okta'], 'Test server listening on port 7777');

before(() => promise);

after(() => promise.then(process => process.kill()));
