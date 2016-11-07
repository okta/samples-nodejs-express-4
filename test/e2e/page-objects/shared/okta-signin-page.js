'use strict';

const util = require('./util');

function input(field) {
  const inputWrap = `o-form-input-${field}`;
  return $(`${util.se(inputWrap)} input`);
}

class OktaSignInPage {

  constructor() {
    this.usernameInput = input('username');
    this.passwordInput = input('password');
    this.submitButton = $('[data-type="save"]');
  }

  waitForPageLoad() {
    return util.wait(this.usernameInput);
  }

  login(username, password) {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);
    return this.submitButton.click();
  }

}

module.exports = OktaSignInPage;
