'use strict';

const OktaSignInPage = require('../shared/okta-signin-page');

class LoginRedirectPage {

  login(username, password) {
    const signIn = new OktaSignInPage();
    signIn.waitForPageLoad();
    return signIn.login(username, password);
  }

}

module.exports = LoginRedirectPage;
