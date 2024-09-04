const { Given } = require('@cucumber/cucumber');

Given('I login with valid {string} and valid {string}', async function (email, password) {
  await this.pages.LoginPage.login(email, password);
});
