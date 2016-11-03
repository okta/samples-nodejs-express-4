var util = require('util');
var url = require('url');
var querystring = require('querystring');
var OIDCStrategy = require('passport-openidconnect').Strategy;
var OAuth2 = require('oauth').OAuth2;

function Strategy(options, verify) {
    options = options || {};

    if (!options.oauthServerURL && 
        (!options.issuer ||
        !options.authorizationURL ||
        !options.tokenURL ||
        !options.userInfoURL)) {
      throw 'passport-okta-openidconnect requires an oauthServerURL if ' +
        'issuer, authorizationURL, tokenURL, or userInfoURL aren\'t supplied'
    }

    options.issuer = options.issuer || options.oauthServerURL;
    options.authorizationURL = options.authorizationURL || options.oauthServerURL + '/oauth2/v1/authorize';
    options.tokenURL = options.tokenURL || options.oauthServerURL + '/oauth2/v1/token';
    options.userInfoURL = options.userInfoURL || options.oauthServerURL + '/oauth2/v1/userinfo';
    options.nonce = true;

    OIDCStrategy.call(this, options, verify);
    this.name = 'okta-oidc';
    this._tokenEndpointAuthMethod = options.tokenEndpointAuthMethod || 'client_secret_basic';
}

util.inherits(Strategy, OIDCStrategy);

// Allow basic auth for client secrets
Strategy.prototype._getOAuth2Client = function (config) {
  var strategy = this;
  var oauth2Client = new OAuth2(config.clientID, config.clientSecret, '',
    config.authorizationURL, config.tokenURL);
  
  // Copy/pasted/modified from node-oauth
  oauth2Client.getOAuthAccessToken= function(code, params, callback) {
    var params = params || {};
    var codeParam = (params.grant_type === 'refresh_token') ? 'refresh_token' : 'code';
    params[codeParam] = code;

    var post_headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (strategy._tokenEndpointAuthMethod === 'client_secret_post') {
      params['client_id'] = this._clientId;
      params['client_secret'] = this._clientSecret;
    } else {
      var base64Secret = new Buffer(this._clientId + ':' + this._clientSecret).toString('base64');
      post_headers['Authorization'] = 'Basic ' + base64Secret;
    }

    var post_data = querystring.stringify(params);

    this._request('POST', this._getAccessTokenUrl(), post_headers, post_data, null, function(error, data, response) {
      if(error)  callback(error);
      else {
        var results = JSON.parse(data);
        var access_token = results['access_token'];
        var refresh_token = results['refresh_token'];
        delete results['refresh_token'];
        callback(null, access_token, refresh_token, results);
      }
    });
  }

  return oauth2Client;
}

module.exports = Strategy;
