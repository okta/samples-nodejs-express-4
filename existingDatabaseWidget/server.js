var express = require('express');
var passport = require('passport');
var Strategy = require('../passport-okta-openidconnect').Strategy;
var db = require('./db');
var path = require('path');

var widgetDirectory = path.resolve(require.resolve('@okta/okta-signin-widget'), '../..');

// Configure the openidconnect strategy for use by Passport.
var DOMAIN = 'YOUR_DOMAIN';
var CLIENT_ID = 'YOUR_CLIENT_ID';
var CLIENT_SECRET = 'YOUR_CLIENT_SECRET';

passport.use(new Strategy({
  oauthServerURL: DOMAIN,
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/callback',
  scope: 'email',
  //tokenEndpointAuthMethod: 'client_secret_post'
}, function(token, tokenSecret, profile, cb) {
  var email = profile._json.email;
  db.users.findByUsername(email, function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false); }
    return cb(null, user);
  });
}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Host the widget
app.use('/widget', express.static(widgetDirectory));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login', function(req, res, next) {
  // Get sessionToken from query param
  if (req.query.sessionToken) {
    passport.authenticate('okta-oidc', {
      sessionToken: req.query.sessionToken
    })(req, res, next);

  } else {
    res.render('login');
  }
});

app.get('/callback', 
  passport.authenticate('okta-oidc', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.listen(3000);
