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

const util = require('../lib/util');
const errors = require('../lib/errors');

const LOGIN_REDIRECT_PATH = '/authorization-code/login-redirect';
const LOGIN_CUSTOM_PATH = '/authorization-code/login-custom';
const CALLBACK_PATH = '/authorization-code/callback';
const PROFILE_PATH = '/authorization-code/profile';
const LOGOUT_PATH = '/authorization-code/logout';

function setupValidCallbackReq() {
  return util.request()
    .get(`${CALLBACK_PATH}?state=SOME_STATE&code=SOME_CODE`)
    .set('Cookie', 'okta-oauth-nonce=SOME_NONCE;okta-oauth-state=SOME_STATE')
    .send();
}

function mockOktaTokenRequest(options) {
  const claims = {
    sub: '00ukz6E06vtrGDVn90g3',
    name: 'John Adams',
    email: 'john@acme.com',
    ver: 1,
    iss: 'http://127.0.0.1:7777',
    aud: '5VNm1xZ6tnr8aDeGrHWf',
    iat: 1478388232,
    exp: Math.floor(new Date().getTime() / 1000) + 3600,
    jti: 'ID.XaR6tP7oHKkw81lQaap0CICytGPvxfSNH0f4zJy2C1g',
    amr: 'pwd',
    idp: '00okosaVJPYJkSwVk0g3',
    nonce: 'SOME_NONCE',
    preferred_username: 'john@acme.com',
    auth_time: 1478388232,
    at_hash: 'n-Hk6KbagtcDdarKOVyAKQ',
  };

  if (options.claims) {
    Object.keys(options.claims).forEach((key) => {
      if (options.claims[key] === null) {
        delete claims[key];
      } else {
        claims[key] = options.claims[key];
      }
    });
  }

  const encoded = new Buffer(JSON.stringify(claims), 'utf8').toString('base64');

  // Construct the id_token.
  // NOTE: We currently do not support validating the signature. Things that
  // have to be done before we can do this:
  // - Make the .well-known request in one of the app servers
  // - Modify mock-okta to use our own signing key
  // - Re-record the mock-okta tapes with the .well-known request
  // - Add the test here
  const idToken = `header.${encoded}.signature`;

  const res = {
    access_token: 'SOME_TOKEN',
    token_type: 'Bearer',
    expires_in: 3600,
    scope: 'openid email profile',
    id_token: idToken,
  };

  if (options.res) {
    Object.keys(options.res).forEach((key) => {
      if (options.res[key] === null) {
        delete res[key];
      } else {
        res[key] = options.res[key];
      }
    });
  }

  return util.mockOktaRequest()
    .post('/set')
    .send({ req: options.req || {}, res });
}

function createSession() {
  const agent = util.agent();
  const req = mockOktaTokenRequest({}).then(() => (
    agent
      .get(`${CALLBACK_PATH}?state=SOME_STATE&code=SOME_CODE`)
      .set('Cookie', 'okta-oauth-nonce=SOME_NONCE;okta-oauth-state=SOME_STATE')
      .send()
  ));
  return req.then(() => agent);
}

describe('Authorization Code', () => {
  describe('GET /authorization-code/login-redirect', () => {
    util.itLoadsTemplateFor(() => util.get(LOGIN_REDIRECT_PATH));
  });

  describe('GET /authorization-code/login-custom', () => {
    util.itLoadsTemplateFor(() => util.get(LOGIN_CUSTOM_PATH));
  });

  describe('GET /authorization-code/callback', () => {
    describe('Validating incoming /callback request', () => {
      it('returns 401 if redirect cookies are not set', () => (
        util.should401(util.get(CALLBACK_PATH), errors.CODE_COOKIES_MISSING)
      ));
      it('returns 401 if query "state" does not match cookie "state"', () => {
        const req = util.request()
          .get(`${CALLBACK_PATH}?state=BAD_STATE`)
          .set('Cookie', 'okta-oauth-nonce=SOME_NONCE;okta-oauth-state=SOME_STATE')
          .send();
        return util.should401(req, errors.CODE_QUERY_STATE_MISSING);
      });
      it('returns 401 if query "code" is not set', () => {
        const req = util.request()
          .get(`${CALLBACK_PATH}?state=SOME_STATE`)
          .set('Cookie', 'okta-oauth-nonce=SOME_NONCE;okta-oauth-state=SOME_STATE')
          .send();
        return util.should401(req, errors.CODE_QUERY_CODE_MISSING);
      });
    });

    describe('Getting id_token via /oauth2/v1/token', () => {
      it('is a POST', () => {
        const mock = { req: { method: 'POST' } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_METHOD);
      });
      it('sets the "content-type" header to "application/x-www-form-urlencoded"', () => {
        const mock = {
          req: {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          },
        };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_CONTENT_TYPE);
      });
      it('constructs the /token request with the correct query params', () => {
        const url = '/oauth2/v1/token' +
          '?grant_type=authorization_code' +
          '&code=SOME_CODE' +
          '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthorization-code%2Fcallback';
        const mock = { req: { url } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_URL);
      });

      // Note: This currently assumes that our app servers will use
      // 'client_secret_basic' as the auth method. Update this when we add
      // mock-okta support for 'client_secret_post'.
      it('uses basic auth for the authorization header', () => {
        const secret = 'NVZObTF4WjZ0bnI4YURlR3JIV2Y6bm9SR08wZGJXR044cWFWb05sLTBQakVRQXRyc0IxOHU0cGJtOTZ5Mg==';
        const mock = {
          req: {
            headers: {
              authorization: `Basic: ${secret}`,
            },
          },
        };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.shouldNotError(req, errors.CODE_TOKEN_INVALID_AUTHORIZATION);
      });
    });

    describe('Redirecting to profile on successful token response', () => {
      it('redirects to /authorization-code/profile', () => {
        const req = mockOktaTokenRequest({}).then(setupValidCallbackReq);
        const redirectUri = 'http://localhost:3000/authorization-code/profile';
        return util.shouldRedirect(req, redirectUri, errors.CODE_TOKEN_REDIRECT);
      });
    });

    describe('Validating /oauth2/v1/token response', () => {
      it('returns 401 if there is an error in the response', () => {
        const mock = { req: { thisExpectedHeader: 'does_not_exist' } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.should401(req, errors.CODE_TOKEN_ERROR);
      });
      it('returns 401 if the response does not contain an id_token', () => {
        const mock = { res: { id_token: null } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.should401(req, errors.CODE_TOKEN_NO_ID_TOKEN);
      });
      it('returns 401 if id_token.nonce does not match the cookie nonce', () => {
        const mock = { claims: { nonce: 'BAD_NONCE' } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.should401(req, errors.CODE_TOKEN_BAD_NONCE);
      });
      it('returns 401 if id_token.iss does not match our issuer', () => {
        const mock = { claims: { iss: 'BAD_ISSUER' } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.should401(req, errors.CODE_TOKEN_BAD_ISSUER);
      });
      it('returns 401 if id_token.aud does not match our clientId', () => {
        const mock = { claims: { aud: 'NOT_CONFIGURED_CLIENT_ID' } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.should401(req, errors.CODE_TOKEN_BAD_AUD);
      });
      it('returns 401 if the id_token has expired', () => {
        // Set expiration to 20 minutes ago
        const exp = Math.floor(new Date().getTime() / 1000) - 1200;
        const mock = { claims: { exp } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.should401(req, errors.CODE_TOKEN_EXPIRED);
      });
      it('accounts for clock skew in expiration check', () => {
        // Set expiration to 4 minutes ago
        const exp = Math.floor(new Date().getTime() / 1000) - 240;
        const mock = { claims: { exp } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.shouldNotError(req, errors.CODE_TOKEN_EXP_CLOCK_SKEW);
      });
      it('returns 401 if the id_token was issued in the future', () => {
        // Set issued at time to 20 minutes from now
        const iat = Math.floor(new Date().getTime() / 1000) + 1200;
        const mock = { claims: { iat } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.should401(req, errors.CODE_TOKEN_IAT_FUTURE);
      });
      it('accounts for clock skew in issued at check', () => {
        // Set issued at time to 4 minutes from now
        const iat = Math.floor(new Date().getTime() / 1000) + 240;
        const mock = { claims: { iat } };
        const req = mockOktaTokenRequest(mock).then(setupValidCallbackReq);
        return util.shouldNotError(req, errors.CODE_TOKEN_IAT_CLOCK_SKEW);
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
      util.itLoadsTemplateFor(() => createSession().then(agent => agent.get(PROFILE_PATH)));
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
