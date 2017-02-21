'use strict';

var url = require('url');
var request = require('request');

function checkStatusCode(desired, okayList) {
  return (err, res) => {
    const statusCode = err ? err.statusCode : res.statusCode;
    if (okayList.indexOf(statusCode) > -1) {
      console.log(`[WARN] Ideally, we choose statusCode ${desired}, but got the acceptable ${statusCode}`);
      return;
    }
    if (statusCode !== desired) {
      throw new Error(`Expected response to have statusCode ${desired}, but got ${statusCode}`);
      return;
    }
  };
}

function requestP(options) {
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (err) {
        return reject(err);
      }
      res.resBody = body;
      if (this && this._redirect && this._redirect.redirects) {
        res.redirects = this._redirect.redirects;
      }
      if (res.statusCode >= 400) {
        reject(res);
      }
      else {
        resolve(res);
      }
    });
  });
}

class TestAgent {

  constructor(baseAppUrl, baseMockUrl) {
    if (!baseAppUrl) {
      throw new Error('No baseAppUrl specified - this is the baseUrl of the app server');
    }
    if (!baseMockUrl) {
      throw new Error('No baseMockUrl specified - this is the baseUrl of the mock server');
    }

    this.baseAppUrl = baseAppUrl;
    this.baseMockUrl = baseMockUrl;

    this.pending = [];
    this.jar = request.jar();

    this.next(
      () => requestP({method: 'GET', uri: `${baseMockUrl}/mock/clear`}),
      {type: 'MOCK_CLEAR'}
    );
  }

  mock(reqs) {
    const options = {
      method: 'POST',
      uri: `${this.baseMockUrl}/mock/set`,
      body: reqs,
      json: true
    };
    return this.next(() => requestP(options), {type: 'MOCK_SET', reqs});
  }

  get(path) {
    const options = {
      method: 'GET',
      uri: `${this.baseAppUrl}${path}`,
      jar: this.jar
    };
    return this.next(() => requestP(options), {type: 'GET', path});
  }

  next(fn, details) {
    this.pending.push({fn, details});
    return this;
  }

  run() {
    const next = this.pending.shift();
    const rest = this.pending;
    this.pending = [];
    return Promise.resolve(next.fn.apply(this, arguments))
    .then((res) => {
      this.pending = this.pending.concat(rest);
      if (this.pending.length === 0) {
        return res;
      }
      return this.run(res);
    });
  }

  verify(verifyFn, errDetail) {
    return this.run()
    .then((res) => verifyFn(null, res), (err) => verifyFn(err))
    .then(() => requestP({method: 'GET', uri: `${this.baseMockUrl}/mock/done`}))
    .catch((err) => {
      let msg = '';
      if (err.message) {
        msg += `${err.message} `;
      }
      if (err.resBody) {
        msg += `${err.resBody} `;
      }
      msg += `\n${errDetail}\n`;
      return requestP({method: 'GET', uri: `${this.baseMockUrl}/mock/log`, json: true})
      .then((res) => {
        const logs = res.resBody;
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

  should403(errDetail) {
    return this.verify(checkStatusCode(403, [401]), errDetail);
  }

  should502(errDetail) {
    return this.verify(checkStatusCode(502, [500]), errDetail);
  }

  shouldNotError(errDetail) {
    const verifyFn = (err, res) => {
      if (err) {
        throw err;
      }
    };
    return this.verify(verifyFn, errDetail);
  }

  shouldRedirectTo(expectedRedirect, errDetail) {
    const verifyFn = (err, res) => {
      if (err) {
        throw err;
      }
      if (!res.redirects || res.redirects.length === 0) {
        throw new Error(`Expected redirect to ${expectedRedirect}, but no redirect`);
      }
      const expected = url.parse(expectedRedirect);
      const redirect = res.redirects[0].redirectUri;
      const parsed = url.parse(redirect);
      ['protocol', 'host', 'pathname'].forEach((part) => {
        if (expected[part] !== parsed[part]) {
          throw new Error(`Expected redirect to ${expectedRedirect}, but got ${redirect}`);
        }
      });
    };
    return this.verify(verifyFn, errDetail);
  }

  shouldNotRedirect(errDetail) {
    const verifyFn = (err, res) => {
      if (err) {
        throw err;
      }
      if (res.redirects && res.redirects.length > 0) {
        const redirect = res.redirects[0].redirectUri;
        throw new Error(`Unexpected redirect to "${redirect}"`);
      }
    };
    return this.verify(verifyFn, errDetail);
  }

}

module.exports = TestAgent;
