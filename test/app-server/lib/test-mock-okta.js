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

/**
 * Simple test server that mocks requests to Okta.
 *
 * Basic behavior:
 * 1. Send a /set request to prime the next response:
 *    - Send a 'req' object to validate the next request against
 *    - Send a 'res' object that will be sent back after validation passes
 * 2. Make a request to the test server. If 'req' validation passes, it will
 *    return a JSON response with a 'res' response body.
 */

/* eslint no-param-reassign: 0, no-console:0 */

'use strict';

const http = require('http');

const config = require('../../../.samples.config.json');

// State variables that keep track of the next request/response pair.
// Note that this only allows for one request at a time!
let nextRequest;
let nextResponse;

function handleSetRequest(req, res) {
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const body = JSON.parse(Buffer.concat(chunks).toString());
    nextRequest = body.req;
    nextResponse = body.res;
    res.end();
  });
}

function validateReq(expected, req) {
  Object.keys(expected).forEach((key) => {
    const expectedVal = expected[key];
    const reqVal = req[key];
    if (expectedVal instanceof Object) {
      validateReq(expectedVal, reqVal);
    } else if (expectedVal !== reqVal) {
      throw new Error(`Expected ${expectedVal}, but got ${reqVal}`);
    }
  });
}

function handleNextRequest(req, res) {
  let body;
  try {
    validateReq(nextRequest, req);
    body = nextResponse;
  } catch (e) {
    res.statusCode = 500;
    body = {
      error: 'Expectation not met',
      error_description: e.message,
    };
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body, null, 2));
}

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/set':
      return handleSetRequest(req, res);
    default:
      return handleNextRequest(req, res);
  }
});

server.listen(config.mockOkta.port, () => {
  console.log(`Test server listening on port ${config.mockOkta.port}`);
});
