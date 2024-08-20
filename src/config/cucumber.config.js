const { setDefaultTimeout, setWorldConstructor } = require('@cucumber/cucumber');
const path = require('path');
const CustomWorld = require(path.resolve(__dirname, '../support/world'));

// Use environment variables with default fallback values
const TIMEOUT = process.env.CUCUMBER_TIMEOUT || 60 * 1000;

// Set the default timeout for all Cucumber steps
setDefaultTimeout(TIMEOUT);

// Set the custom world constructor for managing shared context
setWorldConstructor(CustomWorld);

// Optional: Enable debug logging if needed
if (process.env.DEBUG) {
  console.log(`Cucumber configuration loaded with a timeout of ${TIMEOUT}ms`);
}

const common = [
  '--require-module ts-node/register',
  '--require ../features/step-definitions/**/*.js',
  '--format progress-bar',
  '--format @cucumber/pretty-formatter',
  '--format ../../allure-results',
  '--format json:allure-results/cucumber-report.json',
].join(' ');
// Export configuration for Cucumber CLI
module.exports = {
  default: common, // Add any other options if needed
};
