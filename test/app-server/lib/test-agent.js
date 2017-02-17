'use strict';

// I can swap out chai-http easily by just modifying this class!

/**
 * Description:
 * - Keeps track of sessions
 * - Keeps track of logs? Do this later. Won't need clear if we do this.
 *
 * TODO:
 * - Setup logging in agent
 * - Think about adding util functions here, i.e. ask if "is 401?"
 *   - When we ask, we can verify that we've made all mock requests! And we
 *     have the context because we know all the requests we've made, and all
 *     the mocks we have!
 *   - What is the purpose of the test server, I wonder... well, at the very
 *     least, the only thing that should be handling state is this guy?
 * - Need function to get last request in case we need it
 * - Need to think about how logging works if we clear - do we lose the messages
 *   that we are removing? Maybe a set should just add, now that we are always
 *   going to call clear at the beginning of a new test session
 *
 * - NOW:
 *   - Add error message back in
 *   - Add request logging back
 */

const chai = require('chai');
const chaiHttp = require('chai-http');

function pendingHelper(agent, prevRes) {
  const next = Promise.resolve(agent.pending.shift().call(agent, prevRes));
  if (agent.pending.length === 0) {
    return next;
  }
  return next.then((res) => pendingHelper(agent, res));
}

function run(agent, errorMsg, verifyFn) {
  return pendingHelper(agent)
  .then(verifyFn, verifyFn)
  .then(() => agent.mockAgent.get('/mock/done'))
  .catch((err) => {
    let msg = `${err.message}`;
    // if (err.response && err.response.text) {
    //   msg += `. ${err.response.text}`;
    // }
    msg += `\n${errorMsg}\n`;
    return agent.mockAgent.get('/mock/log').send()
    .then((res) => {
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

// function resolveWith(agent, errorMsg, verifyFn) {
//   return agent.last
//   .then(verifyFn, verifyFn)
//   // .then(() => {
//   //   // Do some verification here of whether we made all requests we were
//   //   // expecting... Question is do we check the test mock-okta server since
//   //   // it already has a queue of things, or do we check against our mocks
//   //   // and requests we've made? Maybe better here because we can clear and
//   //   // add to the mocks at any time in this test session.
//   //   //
//   //   // OKAY, HERE we're going to actually just call the test mock logger here,
//   //   // and deal with that. No worries. <-- here we are
//   // })
//   .catch((err) => {
//     return chai.request(agent.baseMockUrl).post('/mock/log').send()
//     .then((res) => {
//       let msg = `${err.message}\n${errorMsg}`;
//       const logs = res.body;
//       if (logs.length) {
//         msg += '\nRequests to the test okta server:\n';
//         logs.forEach((log, i) => {
//           if (i === logs.length - 1) {
//             msg += `[${i}] ` + JSON.stringify(log, null, 2);
//           }
//           else {
//             msg += `[${i}] ${log.req.url}\n`;
//           }
//         });
//       }
//       throw new Error(msg);
//     });
//   });
// }

function checkStatusCode(desired, okayList) {
  return (res) => {
    if (okayList.indexOf(res.status) > -1) {
      console.log(`[WARN] Ideally, we choose statusCode ${desired}, but got the acceptable ${res.status}`);
    }
    else if (res.status !== desired) {
      throw new Error(`Expected response to have statusCode ${desired}, but got ${res.status}`);
    }
  };
}

class TestAgent {

  constructor(baseAppUrl, baseMockUrl) {
    this.agent = chai.request.agent(baseAppUrl);
    this.mockAgent = chai.request.agent(baseMockUrl);
    this.pending = [];
    this.next(() => this.mockAgent.get('/mock/clear').send());
  }

  mock(reqs) {
    return this.next(() => this.mockAgent.post('/mock/set').send(reqs));
  }

  get(url) {
    return this.next(() => this.agent.get(url).send());
  }

  next(actionFn) {
    this.pending.push(actionFn);
    return this;
  }

  post() {}

  should403(errDetail) {
    return run(this, errDetail, checkStatusCode(403, [401]));
  }

  should502(errDetail) {
    return run(this, errDetail, checkStatusCode(502, [500]));
  }

  shouldNotError(errDetail) {
    return run(this, errDetail, (res) => {
      if (res.status < 400) {
        return;
      }
      let msg = `Expected non-error response, but got ${res.status}\n`;
      if (res.response && res.response.text) {
        let text = res.response.text;
        // Replace if server returns an html stacktrace
        text = text.replace(/<br\s*\/?>/g, '\n');
        text = text.replace(/&nbsp;/g, ' ');
        msg += text;
      }
      throw new Error(msg);
    });
  }

  redirectsTo(url, errDetail) {
    return run(this, errDetail, (res) => {
      const redirects = res.redirects || [];
      const matches = redirects.filter((i) => i === url);
      if (!matches.length) {
        let msg = `Expected redirect to "${url}"`;
        if (redirects.length) {
          msg += `, but got: ${redirects}`;
        }
        throw new Error(msg);
      }
    });
  }

  redirectsToBase(base, errDetail) {
    return run(this, errDetail, (res) => {
      const redirects = res.redirects || [];
      const matches = redirects.filter((url) => url.indexOf(base) > -1);
      if (!matches.length) {
        let msg = `Expected redirect with baseUrl of "${base}"`;
        if (redirects.length) {
          msg += `, but got: ${redirects}`;
        }
        throw new Error(msg);
      }
    });
  }

}

module.exports = TestAgent;
