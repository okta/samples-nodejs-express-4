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

// Each function should:
// x Add error message if does not satisfy verify function
// ? Add logs from request chain
// - Remove logging stuff from test-mock-okta!
// - Add verification of mocks? Do we actually know it?? Sure. We can at least
//   check the request uri's themselves, that should tell enough of the story
// Actually, we don't know because we only know where we're starting from, rather
// than what is being sent in the backchannel by the server.
function resolveWith(agent, errorMsg, verifyFn) {
  return agent.last
  .then(verifyFn, verifyFn)
  // .then(() => {
  //   // Do some verification here of whether we made all requests we were
  //   // expecting... Question is do we check the test mock-okta server since
  //   // it already has a queue of things, or do we check against our mocks
  //   // and requests we've made? Maybe better here because we can clear and
  //   // add to the mocks at any time in this test session.
  //   //
  //   // OKAY, HERE we're going to actually just call the test mock logger here,
  //   // and deal with that. No worries. <-- here we are
  // })
  .catch((err) => {
    return chai.request(agent.baseMockUrl).post('/mock/log').send()
    .then((res) => {
      let msg = `${err.message}\n${errorMsg}`;
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

// function checkStatusCode(reqPromise, desired, okayList) {
//   function check(res) {
//     if (okayList.indexOf(res.status) > -1) {
//       console.log(`[WARN] Ideally, we choose statusCode ${desired}, but got the acceptable ${res.status}`);
//     }
//     else if (res.status !== desired) {
//       throw new Error(`Expected response to have statusCode ${desired}, but got ${res.status}`);
//     }
//   }
//   return reqPromise.then(check, check);
// }

// Maybe the test agent keeps its own logs here? Why do it on the server and
// maintain an extra layer of state?

// PLAN:
// 1. Remove last, and convert it to pending
// 2. "shouldNotError" just goes off the last one
// 3. Move to scheduling functions that return promises, not promises
//    - this way we're also guaranteed it will finish before running something
//      else, although now we sort of have that baked in, but we can simplify.
//    - In fact, nothing will run until we can one of the validate
//      conditions
// 4. The resolvesWith must expect that the pending array can change

class TestAgent {

  constructor(baseAppUrl, baseMockUrl) {
    this.baseMockUrl = baseMockUrl;
    this.agent = chai.request.agent(baseAppUrl);
    this.pending = [
      chai.request(this.baseMockUrl).get('/mock/clear').send()
    ];
    this.last = null;
  }

  mock(reqs) {
    this.pending.push(chai.request(this.baseMockUrl).post('/mock/set').send(reqs));
    return this;
  }

  get(url) {
    this.last = Promise.all(this.pending).then(() => {
      return this.agent.get(url).send();
    });
    return this;
  }

  post() {}

  afterLast(cb) {
    // doesn't work because we never schedule the next set of operations
    this.pending.push(this.last.then(cb));

    // doesn't work because we never schedule the next set of operations
    // i.e. this.last is outdated after we run the process command!
    this.last = this.last.then(cb);
  }

  should403(errDetail) {
    return resolveWith(this, errDetail, checkStatusCode(401, [403]));
  }

  // Do I need this??!!?!?!?
  // Also, should I be using err.response.text in my stuff like in the original
  // shouldNotError function??!?!!?
  shouldNotError(errDetail) {
    return resolveWith(this, errDetail, () => {});
  }

  redirectsToBase(base, errDetail) {
    return resolveWith(this, errDetail, (res) => {
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
