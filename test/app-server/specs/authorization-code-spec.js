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

const util = require('../lib/util');
const errors = require('../lib/errors');
const config = require('../../../.samples.config.json');
const keys1 = require('../lib/keys1');
const keys2 = require('../lib/keys2');
const jws = require('jws');
const merge = require('lodash.merge');
const crypto = require('crypto');
const url = require('url');

const LOGIN_PATH = '/authorization-code/login';
const LOGIN_REDIRECT_PATH = '/authorization-code/login-redirect';
const LOGIN_CUSTOM_PATH = '/authorization-code/login-custom';
const CALLBACK_PATH = '/authorization-code/callback';
const PROFILE_PATH = '/authorization-code/profile';
const LOGOUT_PATH = '/authorization-code/logout';

// -----------------------------------------------------------------------------
// SETUP FUNCTIONS

/**
 * DO I NEED TO DO SOME VALIDATE TING HERE TO MAKE SURE ALL REQUESTS ARE DONE???!?!!?!
 */
function setupLogin(options) {
  const defaults = {
    query: null,
    req: {
      url: '/oauth2/v1/authorize',
      headers: {
        host: '0.0.0.0:7777'
      },
    },
    res: '<html></html>',
  };
  merge(defaults, options);

  const reqs = [{req: defaults.req, res: defaults.res}];
  const uri = defaults.query ? `${LOGIN_PATH}${defaults.query}` : LOGIN_PATH;

  const agent = util.agent();
  return util.mockOktaRequest(reqs)
  .then(() => agent.get(uri).send())
  .then((res) => {
    // What happens if I'm not doing the redirect??!? Do I fail out beforehand?
    const redirect = res.redirects[0];
    const query = url.parse(redirect, true).query;
    return {agent, res, state: query.state, nonce: query.nonce};
  });
}

function setupCallback(options) {
  return setupLogin(options).then((test) => {
    const reqs = [];
    const kid = 'KID_FOO';

    // 1. /oauth2/v1/token

    // Here, I should be able to specify:
    // 1. Basic Auth clientId/secret vs. these in post body (but not both!)
    // 2. Params in query, or in body
    //
    // Maybe instead of just URI, I can specify query parameters when I'm talking
    // about the endpoint, and it can handle it on the backend? Already doing
    // this a little with "query"... but need some extra validation?

    /**
     * - Always pass either post or query through "query" - let's actually call it "params" like backend?
     * - In mock-okta, we can accept both, and write a note saying that this is how the backend works
     * - Do extra validation for this request? Has to either be through header or post
     *   - How do we specify this in a unit test though? This is more like mock-okta test...
     *   - Maybe we can catch the error and try the test again with the other method?!
     *   - Need a test to make sure client_secret isn't passed through query?
     * - Rename query to params? Verify this is what java calls it
     */
    const req = options.req || {};
    if (!req.url) {
      req.url = '/oauth2/v1/token';
    }
    req.query = merge({
      grant_type: 'authorization_code',
      code: 'GOOD_CODE',
      redirect_uri: 'http://localhost:3000/authorization-code/callback',
    }, options.query || {});

    options.idToken = {
      payload: {
        nonce: test.nonce
      }
    };

    const res = {
      access_token: 'SOME_TOKEN',
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'openid email profile',
      id_token: createIdToken(options.idToken, kid),
    };
    merge(res, options.res);
    reqs.push({ req, res });

    return util.mockOktaRequest(reqs)
    .then(() => {
      const state = encodeURIComponent(test.state);
      return test.agent.get(`/authorization-code/callback?code=GOOD_CODE&state=${state}`).send();
    })
    .then((res) => {
      return res;
    });
  });
}








function validateCallback() {
  return util.request()
    .get(`${CALLBACK_PATH}?state=SOME_STATE&code=SOME_CODE`)
    .set('Cookie', 'okta-oauth-nonce=SOME_NONCE;okta-oauth-state=SOME_STATE')
    .send()
    .then(res => util.mockVerify().then(() => res));
}

function randomKid() {
  return crypto.randomBytes(16).toString('hex');
}

function createIdToken(opts, kid) {
  const options = opts || {};
  const jwsOptions = {
    header: {
      alg: 'RS256',
      kid,
    },
    payload: {
      sub: '00ukz6E06vtrGDVn90g3',
      name: 'John Adams',
      email: 'john@acme.com',
      ver: 1,
      iss: 'http://0.0.0.0:7777',
      aud: config.oidc.clientId,
      iat: 1478388232,
      exp: Math.floor(new Date().getTime() / 1000) + 3600,
      jti: 'ID.XaR6tP7oHKkw81lQaap0CICytGPvxfSNH0f4zJy2C1g',
      amr: 'pwd',
      idp: '00okosaVJPYJkSwVk0g3',
      nonce: 'SOME_NONCE',
      preferred_username: 'john@acme.com',
      auth_time: 1478388232,
      at_hash: 'n-Hk6KbagtcDdarKOVyAKQ',
    },
    secret: keys1.privatePem,
  };
  merge(jwsOptions, {
    header: options.header,
    payload: options.payload,
    secret: options.secret,
  });

  let idToken = jws.sign(jwsOptions);
  if (options.signature) {
    idToken = idToken.slice(0, idToken.lastIndexOf('.') + 1) + idToken.signature;
  }

  return idToken;
}

function mockOktaRequests(options) {
  const reqs = [];
  const kid = options.kid || `KID_${randomKid()}`;

  // 1. /oauth2/v1/token
  const req = options.req || {};
  if (!req.url) {
    req.url = '/oauth2/v1/token' +
      '?grant_type=authorization_code' +
      '&code=SOME_CODE' +
      '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthorization-code%2Fcallback';
  }
  const res = {
    access_token: 'SOME_TOKEN',
    token_type: 'Bearer',
    expires_in: 3600,
    scope: 'openid email profile',
    id_token: createIdToken(options.idToken, kid),
  };
  merge(res, options.res);
  reqs.push({ req, res });

  // 2. /oauth2/v1/keys
  if (!options.cachedKeyRequest) {
    const keyReq = { url: '/oauth2/v1/keys' };
    const keyRes = { keys: [options.publicJwk || keys1.publicJwk] };
    keyRes.keys[0].kid = kid;
    reqs.push({ req: keyReq, res: keyRes, optional: options.keysOptional });
  }

  return util.mockOktaRequest(reqs);
}

function createSession() {
  const agent = util.agent();
  const req = mockOktaRequests({}).then(() => (
    agent
      .get(`${CALLBACK_PATH}?state=SOME_STATE&code=SOME_CODE`)
      .set('Cookie', 'okta-oauth-nonce=SOME_NONCE;okta-oauth-state=SOME_STATE')
      .send()
  ));
  return req.then(() => agent);
}

describe('Authorization Code', () => {
  describe('GET /authorization-code/login-redirect', () => {
    util.itLoadsTemplateFor('login-redirect', () => util.get(LOGIN_REDIRECT_PATH));
  });

  describe('GET /authorization-code/login-custom', () => {
    util.itLoadsTemplateFor('login-custom', () => util.get(LOGIN_CUSTOM_PATH));
  });

  describe('GET /authorization-code/login', () => {
    function expectRedirect(options, msg) {
      const base = 'http://0.0.0.0:7777/oauth2/v1/authorize';
      const promise = setupLogin(options).then(test => test.res);
      return util.shouldRedirectToBase(promise, base, msg);
    }

    it('redirects to the authorization_endpoint url discovered in .well-known', () => {
      return expectRedirect({}, errors.REDIRECT_AUTHORIZE_WELL_KNOWN);
    });
    it('redirects with the correct query params', () => {
      const mock = {
        req: {
          query: {
            response_type: 'code',
            client_id: 'zYVNoNIeSwul32vpNiOz',
            redirect_uri: 'http://localhost:3000/authorization-code/callback',
            scope: 'openid email profile',
            state: 'RANDOM_NOT_EMPTY',
            nonce: 'RANDOM_NOT_EMPTY',
          },
        }
      };
      return expectRedirect(mock, errors.REDIRECT_AUTHORIZE_QUERY);
    });
    it('passes through sessionToken if sent to /authorization-code/login', () => {
      const mock = {
        query: '?sessionToken=test-session-token',
        req: {
          query: {
            sessionToken: 'test-session-token',
          },
        }
      };
      return expectRedirect(mock, errors.REDIRECT_AUTHORIZE_SESSION_TOKEN);
    });
  });

  describe('GET /authorization-code/callback', () => {
   describe('Validating incoming /callback request', () => {
      it('returns 403 if no query "state"', () => {
        const req = util.request()
          .get(`${CALLBACK_PATH}?code=SOME_CODE`)
          .send();
        return util.should403(req, errors.CODE_INVALID_QUERY_STATE);
      });
      it('returns 403 if query "state" does not match original "state"', () => {
        return setupLogin().then((test) => {
          const req = test.agent
            .get(`${CALLBACK_PATH}?state=BAD_STATE&code=SOME_CODE`)
            .send();
          return util.should403(req, errors.CODE_INVALID_QUERY_STATE);
        });
      });
      it('returns 401 if query "code" is not set', () => {
        const req = util.request()
          .get(`${CALLBACK_PATH}?state=SOME_STATE`)
          .send();
        return util.should403(req, errors.CODE_QUERY_CODE_MISSING);
      });
    });

    describe('Getting id_token via /oauth2/v1/token', () => {
      it.only('constructs the /token request with the correct query params', () => {
        const req = setupCallback({});
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_URL);
      });
      it('is a POST', () => {
        const mock = util.expand('req.method', 'POST');
        mock.keysOptional = true;
        const req = mockOktaRequests(mock).then(validateCallback);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_METHOD);
      });
      it('sets the "content-type" header to "application/x-www-form-urlencoded"', () => {
        const mock = util.expand('req.headers.content-type', 'application/x-www-form-urlencoded');
        mock.keysOptional = true;
        const req = mockOktaRequests(mock).then(validateCallback);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_CONTENT_TYPE);
      });

      // Note: This currently assumes that our app servers will use
      // 'client_secret_basic' as the auth method. Update this when we add
      // mock-okta support for 'client_secret_post'.
      it('uses basic auth for the authorization header', () => {
        const secret = new Buffer(`${config.oidc.clientId}:${config.oidc.clientSecret}`, 'utf8').toString('base64');
        const mock = util.expand('req.headers.authorization', `Basic ${secret}`);
        mock.keysOptional = true;
        const req = mockOktaRequests(mock).then(validateCallback);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_AUTHORIZATION);
      });

      it('sets the "accept" header to "application/json"', () => {
        const mock = util.expand('req.headers.accept', 'application/json');
        mock.keysOptional = true;
        const req = mockOktaRequests(mock).then(validateCallback);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_HEADER_ACCEPT);
      });

      it('sets the "connection" header to "close"', () => {
        const mock = util.expand('req.headers.connection', 'close');
        mock.keysOptional = true;
        const req = mockOktaRequests(mock).then(validateCallback);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_HEADER_CONNECTION);
      });
    });

    describe('Redirecting to profile on successful token response', () => {
      it('redirects to /authorization-code/profile', () => {
        const req = mockOktaRequests({ keysOptional: true }).then(validateCallback);
        const redirectUri = 'http://localhost:3000/authorization-code/profile';
        return util.shouldRedirect(req, redirectUri, errors.CODE_TOKEN_REDIRECT);
      });
    });

    describe('Validating /oauth2/v1/token response', () => {
      describe('General', () => {
        it('returns 401 if there is an error in the response', () => {
          const mock = { req: { thisExpectedHeader: 'does_not_exist' }, keysOptional: true };
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_ERROR);
        });
        it('returns 401 if the response does not contain an id_token', () => {
          const mock = { res: { id_token: null }, keysOptional: true };
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_NO_ID_TOKEN);
        });
        it('returns 401 if the idToken is malformed', () => {
          const mock = { res: { id_token: 'nodots' }, keysOptional: true };
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_BAD_ID_TOKEN);
        });
      });
      describe('Signature', () => {
        it('makes a request to /oauth2/v1/keys to fetch the public keys', () => {
          const req = mockOktaRequests({}).then(validateCallback);
          return util.shouldNotError(req, errors.CODE_KEYS_INVALID_URL);
        });
        it('returns 401 if the JWT signature is invalid', () => {
          const mock = util.expand('idToken.signature', 'invalidSignature');
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_INVALID_SIG);
        });
        it('returns 401 if id_token is signed with an invalid cert', () => {
          const mock = util.expand('idToken.secret', keys2.privatePem);
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_INVALID_SIG);
        });
        it('returns 401 if the token header algorithm does not match the published key algorithm', () => {
          const mock = util.expand('idToken.header.alg', 'none');
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_INVALID_ALG);
        });
        it('caches responses to /oauth2/v1/keys', () => {
          const kid1 = randomKid();
          const kid2 = randomKid();
          const withFirstKid1 = () => (
            mockOktaRequests({ kid: kid1 }).then(validateCallback)
          );
          const withSecondKid1 = () => (
            mockOktaRequests({ kid: kid1, cachedKeyRequest: true }).then(validateCallback)
          );
          const withKid2 = () => {
            const mock = {
              kid: kid2,
              idToken: {
                secret: keys2.privatePem,
              },
              publicJwk: keys2.publicJwk,
            };
            return mockOktaRequests(mock).then(validateCallback);
          };
          const reqs = withFirstKid1().then(withSecondKid1).then(withKid2);
          return util.shouldNotError(reqs, errors.CODE_KEYS_CACHE);
        });
      });

      describe('Claims', () => {
        it('returns 401 if id_token.nonce does not match the cookie nonce', () => {
          const mock = util.expand('idToken.payload.nonce', 'BAD_NONCE');
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_BAD_NONCE);
        });
        it('returns 401 if id_token.iss does not match our issuer', () => {
          const mock = util.expand('idToken.payload.iss', 'BAD_ISSUER');
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_BAD_ISSUER);
        });
        it('returns 401 if id_token.aud does not match our clientId', () => {
          const mock = util.expand('idToken.payload.aud', 'NOT_CONFIGURED_CLIENT_ID');
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_BAD_AUD);
        });
        it('returns 401 if the id_token has expired', () => {
          // Set expiration to 20 minutes ago
          const exp = Math.floor(new Date().getTime() / 1000) - 1200;
          const mock = util.expand('idToken.payload.exp', exp);
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_EXPIRED);
        });
        it('accounts for clock skew in expiration check', () => {
          // Set expiration to 4 minutes ago
          const exp = Math.floor(new Date().getTime() / 1000) - 240;
          const mock = util.expand('idToken.payload.exp', exp);
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.shouldNotError(req, errors.CODE_TOKEN_EXP_CLOCK_SKEW);
        });
        it('returns 401 if the id_token was issued in the future', () => {
          // Set issued at time to 20 minutes from now
          const iat = Math.floor(new Date().getTime() / 1000) + 1200;
          const mock = util.expand('idToken.payload.iat', iat);
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.should401(req, errors.CODE_TOKEN_IAT_FUTURE);
        });
        it('accounts for clock skew in issued at check', () => {
          // Set issued at time to 4 minutes from now
          const iat = Math.floor(new Date().getTime() / 1000) + 240;
          const mock = util.expand('idToken.payload.iat', iat);
          const req = mockOktaRequests(mock).then(validateCallback);
          return util.shouldNotError(req, errors.CODE_TOKEN_IAT_CLOCK_SKEW);
        });
      });
    });
  });

  describe('GET /authorization-code/profile', () => {
    describe('Before authentication', () => {
      it('redirects to /', () => {
        const req = util.get(PROFILE_PATH);
        return util.shouldRedirect(req, 'http://localhost:3000/', errors.CODE_PROFILE_NO_SESSION);
      });
    });

    describe('After authentication and user session is set', () => {
      it('does not redirect', () => {
        const req = createSession().then(agent => agent.get(PROFILE_PATH));
        return util.shouldNotRedirect(req, errors.CODE_PROFILE_NO_REDIRECT);
      });
      util.itLoadsTemplateFor('profile', () => createSession().then(agent => agent.get(PROFILE_PATH)));
    });
  });

  describe('GET /authorization-code/logout', () => {
    it('destroys the session', () => {
      const req = createSession().then(agent => (
        agent.get(LOGOUT_PATH).then(() => agent.get(PROFILE_PATH))
      ));
      return util.shouldRedirect(req, 'http://localhost:3000/', errors.CODE_LOGOUT_SESSION);
    });
    it('redirects to /', () => {
      const req = createSession().then(agent => agent.get(LOGOUT_PATH));
      return util.shouldRedirect(req, 'http://localhost:3000/', errors.CODE_LOGOUT_REDIRECT);
    });
  });
});
