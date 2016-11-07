'use strict';

const util = require('./shared/util');

class ScenariosPage {

  constructor() {
    this.$linkAuthCodeLoginRedirect = $(util.se('auth-code-login-redirect'));
    this.$linkAuthCodeLoginCustom = $(util.se('auth-code-login-custom'));
  }

  load() {
    return browser.get('http://localhost:3000/');
  }

  waitForPageLoad() {
    return util.wait(this.$linkAuthCodeLoginRedirect);
  }

  chooseAuthCodeLoginRedirect() {
    return this.$linkAuthCodeLoginRedirect.click();
  }

  chooseAuthCodeLoginCustom() {
    return this.$linkAuthCodeLoginCustom.click();
  }

}

module.exports = ScenariosPage;
