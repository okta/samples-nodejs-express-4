'use strict';

const OktaSignInPage = require('../shared/okta-signin-page');
const util = require('../shared/util');

class LoginRedirectPage {

  constructor() {
    this.$loginLink = $(util.se('login-link'));
  }

  login(username, password) {
    util.wait(this.$loginLink);
    this.$loginLink.click();
    const signIn = new OktaSignInPage();
    signIn.waitForPageLoad();
    return signIn.login(username, password);
  }

}

module.exports = LoginRedirectPage;
