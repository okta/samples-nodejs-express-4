'use strict';

const util = require('../shared/util');

class AppPage {

  constructor() {
    this.$email = $(util.se('email'));
    this.$logoutLink = $(util.se('logout-link'));
  }

  waitForPageLoad() {
    return util.wait(this.$email);
  }

  getEmail() {
    util.wait(this.$email);
    return this.$email.getText();
  }

  logout() {
    util.wait(this.$logoutLink);
    return this.$logoutLink.click();
  }

}

module.exports = AppPage;
