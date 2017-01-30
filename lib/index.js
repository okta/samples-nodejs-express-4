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

const passport = require('passport');
// const OidcStrategy = require('passport-openidconnect').Strategy;
const OktaStrategy = require('./okta-strategy');

const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cons = require('consolidate');
const handlers = require('./route-handlers');
const config = require('../.samples.config.json');


const templateDir = path.resolve(__dirname, '../tools/templates');
const frontendDir = path.resolve(__dirname, '../dist');

passport.use('okta', new OktaStrategy());

// - Make this an "Okta strategy" that we can just pass in our issuer, clientId, secret,
//   and redirectUris
// - Verify that we're doing all our claims by testing it against our endpoints
// - Add tests for .well-known

// passport.use('oidc', new OidcStrategy({
//   sessionKey: 'bla bb',
//   skipUserProfile: true,
//   scope: 'openid email profile',
//   resolver: {
//     resolve: function (identifier, cb) {
//       console.log('CALLING RESOLVER.RESOLVE');
//       cb(null, 'https://oswtests.oktapreview.com');
//     }
//   },
//   registrar: {
//     resolve: function (issuer, cb) {
//       console.log('CALLING REGISTRAR.RESOLVE');
//       cb(null, {
//         id: 'rW47c465c1wc3MKzHznu',
//         secret: 'TsQ1Fmglq43ZwrjK418zxjY-t6wa71h2WsOPOMW2',
//         redirectURIs: [
//           'http://localhost:3000/done'
//         ]
//       });
//     }
//   }
// }, (iss, sub, profile, jwtClaims, accessToken, refreshToken, params, verified) => {

//   // Probably here we'll want to pass in the req, and just do all our own
//   // validation. Do they do any validation on their own??!?!!?!
//   // And put this all in that module, so that they don't have to do it themselves!
//   // Including getting the keys, etc...

//   console.log('************HERE WE ARE******************');
//   console.log('IS THIS THE VERIFY CALLBACK?');
//   console.log(profile);
//   console.log(jwtClaims);
//   verified(null, jwtClaims);
// }));

// passport.serializeUser((user, done) => {
//   done(JSON.stringify(user));
// });

// passport.deserializeUser((id, done) => {
//   done(JSON.parse(id));
// });


const app = express();

app.use('/assets', express.static(frontendDir));

// Use mustache to serve up the server side templates
app.engine('mustache', cons.mustache);
app.set('view engine', 'mustache');
app.set('views', templateDir);

// The authorization code flows are stateful - they use a session to
// store user state (vs. relying solely on an id_token or access_token).
app.use(cookieParser());
app.use(session({
  secret: 'AlwaysOn',
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// These are the routes that need to be implemented to handle the
// authorization code scenarios
app.get('/', handlers.scenarios);


app.get('/login', passport.authenticate('oidc'));
app.get('/done', passport.authenticate('oidc'));
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function isauth() {
  return function (req, res, next) {
    console.log('HERE WE ARE');
    if (req.isAuthenticated || req.isAuthenticated()) {
      console.log('LETS GO TO NEXT');
      return next();
    }
    console.log('NOT AUTHED');
    res.redirect('/');
  }
}

app.get('/profile', isauth(), handlers.fooprofile);


app.get('/authorization-code/login-redirect', handlers.loginRedirect);
app.get('/authorization-code/login-custom', handlers.loginCustom);
app.get('/authorization-code/profile', handlers.profile);
app.get('/authorization-code/logout', handlers.logout);
app.get('/authorization-code/callback', handlers.callback);

app.listen(config.server.port, () => {
  console.log('SERVER STARTED');
});
