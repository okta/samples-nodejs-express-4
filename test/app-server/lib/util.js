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

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const url = require('url');
const config = require('../../../.samples.config.json');
const errors = require('./errors');
const TestAgent = require('./test-agent');

const expect = chai.expect;
const util = module.exports = {};
const baseAppUrl = `http://localhost:${config.server.port}`;
const baseMockOktaUrl = `http://127.0.0.1:${config.mockOkta.port}`;

chai.use(chaiHttp);












/**
 * Simple helper function that wraps chaiHttp's request method.
 */
util.request = () => chai.request(baseAppUrl);

/**
 * Gets chai agent, which is used to start a chain of requests where cookies
 * are preserved.
 */
util.agent = () => chai.request.agent(baseAppUrl);

// Add some comment here. Can probably replace the agent function with this
// when we're done. Would actually be nice to use the agent for everything,
// instead of having to call util all the time...
util.startTestSession = () => {
  return chai.request(baseMockOktaUrl).get('/mock/clear').send()
  .then(() => {
    const agent = chai.request.agent(baseAppUrl);

    // What can I add here to make it nicer?

    return agent;
  });
};

util.startTestSession2 = () => {
  return new TestAgent(baseAppUrl, baseMockOktaUrl);
};


/**
 * Convenience method for GET requests that do not require setting special
 * headers or cookie state.
 */
util.get = path => util.request().get(path).send();

/**
 * Sends a /mock/set request to the test mock-server to set expectations for the
 * next request.
 */
util.mockOktaRequest = reqs => (
  chai.request(baseMockOktaUrl).post('/mock/set').send(reqs)
);

/**
 * Sends a /mock/done request to the test mock-server to check any final
 * expectations.
 */
util.mockVerify = () => (
  chai.request(baseMockOktaUrl).post('/mock/done').send()
);

/**
 * Sends a /mock/log request to the test mock-server to output log information
 * for the current test.
 */
util.mockLog = () => (
  chai.request(baseMockOktaUrl).post('/mock/log').send()
);
util.fetchLogFromMockOktaServer = () => (
  chai.request(baseMockOktaUrl).post('/mock/log').send()
);

/**
 * Helper function to construct nested objects.
 *
 * Example:
 * util.expand('a.b.c', 3) -> { a: { b: c: 3 } }
 */
util.expand = (key, val) => {
  const parts = key.split('.');
  const obj = {};
  let cursor = obj;
  parts.forEach((part, i) => {
    cursor[part] = i === parts.length - 1 ? val : {};
    cursor = cursor[part];
  });
  return obj;
};

util.warn = (msg) => {
  console.log(`W-A-R-N-> ${msg}`);
};

// util.returnsCode = (desiredCode, alternativeCodes, reqPromise, msg) => {


// };

// util.returnsCode = (reqPromise, c)

util.shouldReturnStatus = (reqPromise, desired, okayList, msg) => {
  function check(res) {
    okayList || (okayList = []);
    if (okayList.indexOf(res.status) > -1) {
      util.warn(`Ideally we choose statusCode ${desired}, but got the acceptable ${res.status}`);
    }
    else if (res.status !== desired) {
      throw new Error(`Expected response to have statusCode ${desired}, but got ${res.status}\n${msg}`);
    }
  }
  return addOktaLogOnError(reqPromise.then(check, check));
};


/**
 * SHOULD I SWAP OUT CHAI-HTTP WITH REQUEST??!?!?!?! Or request-promise. So
 * that it's easier to think about this, but also to pipe out the response body
 * since that is probably more useful in the error conditions than just saying
 * "internal server error".
 *
 * Also, evaluate all error messages to make sure I'm saying "502" now
 */

/**
 * Verifies that the response sets a 401 status code
 */
util.should401 = (reqPromise, msg) => {
  // Handler for "success" responses - since we are expecting a 401, this will
  // always throw an error.
  function success(res) {
    const err = `Expected response to have statusCode 401, but got ${res.statusCode}`;
    throw new Error(`${err}\n${msg}`);
  }

  // This is the expected response - additionally, we also expect that the
  // statusCode is 401.
  function fail(res) {
    try {
      expect(res).to.have.status(401);
    } catch (e) {
      console.log(res);
      throw new Error(`${e.message}\n${msg}`);
    }
  }

  return appendOktaLogOnError(reqPromise.then(success, fail));
};

/**
 * Verifies that the response sets a 403 Forbidden status code
 */
util.should403 = (reqPromise, msg) => {
  // Handler for "success" responses - since we are expecting a 401, this will
  // always throw an error.
  function success(res) {
    const err = `Expected response to have statusCode 403, but got ${res.statusCode}`;
    throw new Error(`${err}\n${msg}`);
  }

  // This is the expected response - additionally, we also expect that the
  // statusCode is 401.
  function fail(res) {
    try {
      expect(res).to.have.status(403);
    } catch (e) {
      throw new Error(`${e.message}\n${msg}`);
    }
  }

  return appendOktaLogOnError(reqPromise.then(success, fail));
};


function addOktaLogOnError(reqPromise) {
  return reqPromise.catch((err) => {
    return util.fetchLogFromMockOktaServer()
    .then((res) => {
      let msg = err;
      const logs = res.body;
      if (logs.length) {
        msg += '\nRequests to the test okta server:\n';
        logs.forEach((log, i) => {
          if (i === logs.length - 1) {
            msg += `[${i}] ` + JSON.stringify(log, null, 2);
          }
          else {
            msg += `[${i}] ${log.req.url}\n`;
          }
        });
      }
      throw new Error(msg);
    });
  });
}

// ADD SOME DESCRIPTION HERE!
// ONLY OUTPUT REQ, RES FROM LAST?!
function appendOktaLogOnError(reqPromise) {
  return reqPromise.catch((err) => {
    return util.mockLog().then((res) => {
      let msg = err;
      const logs = res.body;
      if (logs.length) {
        msg += `
Requests to the test okta server:
${JSON.stringify(logs, null, 2)}
`
      }
      throw new Error(msg);
    });
  });
}

/**
 * Verifies that the response does not send an error code
 */
util.shouldNotError = (reqPromise, msg) => (
  appendOktaLogOnError(reqPromise.catch((err) => {
    throw new Error(`${err.message}. ${err.response.text}\n${msg}`);
  }))
);

/**
 * Verifies that the response redirects to the given redirectUri
 */
util.shouldRedirect = (reqPromise, redirectUri, msg) => (
  reqPromise
  .then((res) => {
    console.log(res);
    expect(res).redirectTo(redirectUri);
  })
  .catch((err) => {
    throw new Error(`${err.message}\n${msg}`);
  })
);

/**
 * Verifies that the response redirects to the given baseUrl. This differs
 * from the standard "shouldRedirect" in that it is not an exact match -
 * it only checks the base.
 */
util.shouldRedirectToBase = (reqPromise, base, msg) => (
  appendOktaLogOnError(
    reqPromise
    .then((res) => {
      const redirects = res.redirects || [];
      const matches = redirects.filter((url) => url.indexOf(base) > -1);
      if (!matches.length) {
        let msg = `Expected redirect with baseUrl of "${base}"`;
        if (redirects.length) {
          msg += `, but got: ${redirects}`;
        }
        throw new Error(msg);
      }
    })
    .catch((err) => {
      throw new Error(`${err.message}\n${msg}`);
    })
  )
);

/**
 * Verifies that the response does not redirect
 */
util.shouldNotRedirect = (reqPromise, msg) => (
  reqPromise
  .then(res => expect(res).to.not.redirect)
  .catch((err) => {
    throw new Error(`${err.message}\n${msg}`);
  })
);

/**
 * Validates that the given route returns an html response that matches the
 * mustache template.
 *
 * Note: This is intentionally loose - in some frameworks it might not be
 * possible (or desired) to use the template - in that case, we only check that
 * the response matches the minimum to serve the frontend assets.
 */
util.itLoadsTemplateFor = (docPartial, reqFn) => {
  function hasBodyText(text) {
    return reqFn()
    .then(res => expect(res.resBody).to.contain(text))
    .catch(() => {
      const err = `Expected response to contain ${text}`;
      throw new Error(`${err}\n${errors.INVALID_TEMPLATE}`);
    });
  }

  it('returns status code 200', () => (
    reqFn().then(res => expect(res.statusCode).to.equal(200))
  ));
  it('is html', () => (
    reqFn().then(res => expect(res.headers['content-type']).to.contain('text/html'))
  ));
  it('loads sign-in css', () => (
    hasBodyText('<link href="/assets/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>')
  ));
  it('loads theme css', () => (
    hasBodyText('<link href="/assets/css/okta-theme.css" type="text/css" rel="stylesheet"/>')
  ));
  it('sets base anchor for frameworks like angular', () => (
    hasBodyText('<base href="/"/>')
  ));
  it('loads javascript bundle', () => (
    hasBodyText('<script src="/assets/bundle.js"></script>')
  ));
  it('runs bootstrap', () => (
    hasBodyText('bundle.bootstrap(')
  ));
  it('includes the correct template', () => (
    hasBodyText(`class="doc-${docPartial}"`).catch(() => {
      const err = `Expected tools/templates/${docPartial}.mustache to be loaded`;
      throw new Error(`${err}\n${errors.DOC_PARTIAL}`);
    })
  ));
};

// login
// callback
// token
// util.setupLoginFlow = (options) => {
//   const defaults = {
//     login: {
//       query: null,
//       req: {
//         url: '/oauth2/v1/authorize',
//         headers: {
//           host: '0.0.0.0:7777'
//         },
//       },
//       res: '<html></html>',
//     },
//     callback: {
//     },
//   };

//   const agent = util.agent();

//   // 1. /authorization-code/login


//   const agent = util.agent();
//   const reqs = [{
//     req: {
//       url: '/oauth2/v1/authorize',
//     },
//     res: '<html></html>',
//   }];

//   return util.mockOktaRequest(reqs)
//         .then(() => agent.get(LOGIN_PATH).send())
//     .then((res) => {
//       const redirect = res.redirects[0];
//       const query = url.parse(redirect, true).query;
//       return {agent, query};
//     });



// };
