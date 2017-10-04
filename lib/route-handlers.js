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

/* eslint brace-style:0, no-param-reassign:0, import/no-extraneous-dependencies:0, no-shadow:0, no-return-assign:0 */

'use strict';

const request = require('request');
const querystring = require('querystring');
const config = require('../.samples.config.json').oktaSample;
const jws = require('jws');
const jwk2pem = require('pem-jwk').jwk2pem;

const handlers = module.exports = {};
const cachedJwks = {};

/**
 * Index page - lists the scenarios that the developer can choose from
 * This is page that oidc-middleware redirects to by default
 * If we have the userinfo object, we can show the profile page
 * Route: /
 */
handlers.scenarios = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect(302, '/authorization-code/profile');
    return;   
  }
  res.render('overview', { config });
};

/**
 * Authorization code, login redirect flow - Initiates the flow to get a code
 * by redirecting to Okta as the IDP. This flow is useful if you don't need
 * a custom login form.
 *
 * Route: /authorization-code/login-redirect
 */
handlers.loginRedirect = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect(302, '/authorization-code/profile');
    return;
  }
  res.render('login-redirect', { config });
};

/**
 * Basic app logged-in state. This is protected by the session cookie, which is
 * only set when a successful auth to Okta has finished.
 *
 * Route: /authorization-code/profile
 */
handlers.profile = (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect(302, '/');
    return;
  }
  res.render('profile', { user: req.userinfo, config });
};

/**
 * Logout handler - clears the server side app session. Note - the Okta
 * session is killed before visiting this route in the client side code.
 *
 * Route: /authorization-code/logout
 */
handlers.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};