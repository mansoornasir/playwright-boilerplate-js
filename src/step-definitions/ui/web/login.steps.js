const { Given, When } = require('@cucumber/cucumber');
const LoginPage = require('../../../pages/Login.page');

Given(
  'I am on the login page',
  { timeout: parseInt(process.env.DEFAULT_TIMEOUT) },
  async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.navigateToLoginPage(process.env.BASE_URL + '/signin');
  },
);

When(
  'I login with valid credentials',
  { timeout: parseInt(process.env.DEFAULT_TIMEOUT) },
  async function () {
    await loginPage.loginWithValidCredentials();
  },
);
