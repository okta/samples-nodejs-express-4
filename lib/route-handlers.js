'use strict';

const request = require('request');
const querystring = require('querystring');
const config = require('../.samples.config.json');

const handlers = module.exports = {};

/**
 * Index page - lists the scenarios that the developer can choose from
 *
 * Route: /
 */
handlers.scenarios = (req, res) => {
  // This would normally not be necessary, but the SignIn Widget is currently
  // using an older version of AuthJs, which uses a different cookie for
  // setting the state and nonce values.
  res.clearCookie('okta-oauth-nonce');
  res.clearCookie('okta-oauth-state');
  res.clearCookie('okta-oauth-redirect-params');
  res.clearCookie('okta-oauth-redirect-params', { path: '/authorization-code' });

  res.render('index', { oidc: config.oidc });
};

/**
 * Authorization code, login redirect flow - Initiates the flow to get a code
 * by redirecting to Okta as the IDP. This flow is useful if you don't need
 * a custom login form.
 *
 * Route: /authorization-code/login-redirect
 */
handlers.loginRedirect = (req, res) => {
  if (req.session.user) {
    res.redirect(302, '/authorization-code/profile');
    return;
  }
  res.render('index', { oidc: config.oidc });
};

/**
 * Authorization code, custom login flow - Initiates the flow to get a code
 * using a custom login form:
 * 1. Shows a custom login form on the app page, using the Okta Sign-In Widget
 * 2. After logging in, uses the sessionToken that is returned from the
 *    Authn API to initiate an OIDC flow
 *
 * Route: /authorization-code/login-custom
 */
handlers.loginCustom = (req, res) => {
  if (req.session.user) {
    res.redirect(302, '/authorization-code/profile');
    return;
  }
  res.render('index', { oidc: config.oidc });
};

/**
 * Basic app logged-in state. This is protected by the session cookie, which is
 * only set when a successful auth to Okta has finished.
 *
 * Route: /authorization-code/profile
 */
handlers.profile = (req, res) => {
  if (!req.session.user) {
    res.redirect(302, '/');
    return;
  }

  // This would normally not be necessary, but the SignIn Widget is currently
  // using an older version of AuthJs, which uses a different cookie for
  // setting the state and nonce values.
  res.clearCookie('okta-oauth-nonce');
  res.clearCookie('okta-oauth-state');
  res.clearCookie('okta-oauth-redirect-params');
  res.clearCookie('okta-oauth-redirect-params', { path: '/authorization-code' });

  res.render('index', { user: req.session.user, oidc: config.oidc });
};


/**
 * Logout handler - clears the server side app session. Note - the Okta
 * session is killed before visiting this route in the client side code.
 *
 * Route: /authorization-code/logout
 */
handlers.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.redirect(302, '/');
  });
};

/**
 * Callback redirect handler for the OAuth 2.0 flow:
 * 1. Initiate the flow with login-redirect or login-custom
 * 2. This will redirect to the Okta /authorize endpoint
 * 3. When the user is verified, an authorization code is returned here
 * 4. Exchange the code for an id_token
 * 5. Validate the id_token claims
 * 6. Set the user session
 *
 * Route: /authorization-code/callback
 */
handlers.callback = (req, res) => {
  let nonce;
  let state;

  // Before initiating the /token request, validate that the user's state
  // matches what we expect. The client sends a state parameter to Okta in
  // the /authorize request, and sets these cookies for validation here on the
  // server side.
  if (req.cookies['okta-oauth-nonce'] && req.cookies['okta-oauth-state']) {
    nonce = req.cookies['okta-oauth-nonce'];
    state = req.cookies['okta-oauth-state'];
  }
  // Note: This is the old method of setting the cookie - it is deprecated as
  // of Okta AuthJS 1.6.0.
  else {
    const redirectParams = JSON.parse(req.cookies['okta-oauth-redirect-params']);
    nonce = redirectParams.nonce;
    state = redirectParams.state;
  }
  if (!req.query.state || req.query.state !== state) {
    res.status(401).send(`Query state "${req.query.state}" does not match cookie state "${state}"`);
    return;
  }

  // The default token auth method is 'client_secret_basic'
  const secret = new Buffer(`${config.oidc.clientId}:${config.oidc.clientSecret}`, 'utf8').toString('base64');

  const query = querystring.stringify({
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: config.oidc.redirectUri,
  });

  const options = {
    url: `${config.oidc.oktaUrl}/oauth2/v1/token?${query}`,
    method: 'POST',
    headers: {
      Authorization: `Basic: ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  request(options, (err, tokenRes, body) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    const json = JSON.parse(body);
    if (json.error) {
      res.status(401).send(`${json.error}: ${json.error_description}`);
      return;
    }

    const idToken = json.id_token;
    if (!json.id_token) {
      res.status(401).send('No id_token returned in the response');
    }

    // The id_token is a JWT that contains the user claims in the payload
    const payload = idToken.split('.')[1];
    const claims = JSON.parse(new Buffer(payload, 'base64').toString('utf8'));

    // Verify that the nonce matches the nonce generated on the client side
    if (nonce !== claims.nonce) {
      res.status(401).send(`id_token nonce "${claims.nonce}" does not match cookie nonce ${nonce}`);
      return;
    }

    // Verify that the issuer is Okta, and specifically the endpoint that we
    // performed authorization against.
    if (config.oidc.oktaUrl !== claims.iss) {
      res.status(401).send(`id_token issuer ${claims.iss} does not match our issuer ${config.oidc.oktaUrl}`);
      return;
    }

    // Verify that the id_token was minted specifically for our clientId
    if (config.oidc.clientId !== claims.aud) {
      res.status(401).send(`id_token aud ${claims.aud} does not match our clientId ${config.oidc.clientId}`);
      return;
    }

    // Verify the token has not expired. It is also important to account for
    // clock skew in the event this server or the Okta authorization server has
    // drifted.
    const now = Math.floor(new Date().getTime() / 1000);
    const maxClockSkew = 600; // 5 minutes
    if (now - maxClockSkew > claims.exp) {
      const date = new Date(claims.exp * 1000);
      res.status(401).send(`The JWT expired and is no longer valid - claims.exp ${claims.exp}, ${date}`);
      return;
    }

    // Verify that the token was not issued in the future (accounting for clock
    // skew).
    if (claims.iat > (now + maxClockSkew)) {
      res.status(401).send(`The JWT was issued in the future - iat ${claims.iat}`);
      return;
    }

    // The id_token is good! In a real app, this is the point where you would
    // lookup the user in a user store, and set the session for the user.
    //
    // In this sample app, we'll take a shortcut and just set some of the
    // claims as the "user object"
    req.session.user = {
      email: claims.email,
      claims,
    };

    // Now that the session cookie is set, we can navigate to the logged-in
    // app page.
    res.redirect(302, '/authorization-code/profile');
  });
};
