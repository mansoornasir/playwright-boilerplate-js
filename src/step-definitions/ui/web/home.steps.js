const { Given, Then } = require('@cucumber/cucumber');

Given('I am on the home page', async function () {
  await this.pages.HomePage.navigateToHomePage(process.env.BASE_URL);
});

Then('I should see the welcome message', async function () {
  await this.pages.HomePage.verifyWelcomeMessage();
});
