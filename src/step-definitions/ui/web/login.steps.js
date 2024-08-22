const { Given, When } = require('@cucumber/cucumber');

Given(
  'I am on the login page',
  { timeout: parseInt(process.env.DEFAULT_TIMEOUT) },
  async function () {
    await this.pages.LoginPage.navigateToLoginPage(
      process.env.BASE_URL + '/signin',
    );
  },
);

When(
  'I login with valid credentials',
  { timeout: parseInt(process.env.DEFAULT_TIMEOUT) },
  async function () {
    await this.pages.LoginPage.loginWithValidCredentials();
  },
);
