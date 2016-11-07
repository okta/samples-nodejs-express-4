const EC = protractor.ExpectedConditions;
const util = module.exports = {};

util.wait = (elementFinder) => {
  browser.wait(EC.presenceOf(elementFinder));
};

util.se = val => `[data-se="${val}"]`;
