const express = require('express');
const session = require('express-session');
const cons = require('consolidate');
const path = require('path');
const { ExpressOIDC } = require('@okta/oidc-middleware');

const config = require('./.samples.config.json').oktaSample;
const templateDir = path.join(__dirname, 'views');
const frontendDir = path.join(__dirname, 'assets');

const oidc = new ExpressOIDC({
  issuer: config.oidc.issuer,
  client_id: config.oidc.clientId,
  client_secret: config.oidc.clientSecret,
  redirect_uri: config.oidc.redirectUri,
  scope: config.oidc.scope
});

const app = express();

app.use(session({
  secret: 'this-should-be-very-random',
  resave: true,
  saveUninitialized: false
}));

// Provide the configuration to the view layer because we show it on the homepage
const displayConfig = Object.assign(
  {},
  config.oidc,
  {
    clientSecret: '****' + config.oidc.clientSecret.substr(config.oidc.clientSecret.length - 4, 4)
  }
);

app.locals.oidcConfig = displayConfig;

// This server uses mustache templates located in views/ and css assets in assets/
app.use('/assets', express.static(frontendDir));
app.engine('mustache', cons.mustache);
app.set('view engine', 'mustache');
app.set('views', templateDir);

app.use(oidc.router);

app.get('/', (req, res) => {
  res.render('home', {
    isLoggedIn: !!req.userinfo,
    userinfo: req.userinfo
  });
});

app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {
  // Convert the userinfo object into an attribute array, for rendering with mustache
  const attributes = Object.entries(req.userinfo);
  res.render('profile', {
    isLoggedIn: !!req.userinfo,
    userinfo: req.userinfo,
    attributes
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

oidc.on('ready', () => {
  app.listen(config.server.port, () => console.log(`App started on port ${config.server.port}`));
});

oidc.on('error', err => {
  // An error occurred while setting up OIDC
  throw err;
});
