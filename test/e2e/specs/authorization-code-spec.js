'use strict';

const ScenariosPage = require('../page-objects/scenarios-page');
const LoginRedirectPage = require('../page-objects/authorization-code/login-redirect-page');
const LoginCustomPage = require('../page-objects/authorization-code/login-custom-page');
const AppPage = require('../page-objects/authorization-code/app-page');

describe('Authorization Code Flows', () => {
  const scenarios = new ScenariosPage();
  const loginRedirect = new LoginRedirectPage();
  const loginCustom = new LoginCustomPage();
  const app = new AppPage();

  beforeEach(() => {
    browser.driver.get('about:blank');
    browser.ignoreSynchronization = true;
    return scenarios.load();
  });

  afterEach(() => {
    app.logout();
    return scenarios.waitForPageLoad();
  });

  it('can login with Okta as the IDP', () => {
    scenarios.chooseAuthCodeLoginRedirect();
    loginRedirect.login('george', 'Asdf1234');
    app.waitForPageLoad();
    expect(app.getEmail()).toBe('george@acme.com');
  });

  it('can login with a custom login form', () => {
    scenarios.chooseAuthCodeLoginCustom();
    loginCustom.login('john', 'Asdf1234');
    app.waitForPageLoad();
    expect(app.getEmail()).toBe('john@acme.com');
  });
});

