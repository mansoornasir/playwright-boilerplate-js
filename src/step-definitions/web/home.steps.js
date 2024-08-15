const { Given, Then } = require('@cucumber/cucumber');
const HomePage = require('../../pages/Home.page');

Given('I am on the home page', async function () {
  homePage = new HomePage(this.page);
  await homePage.navigateToHomePage(process.env.BASE_URL);
});

Then('I should see the welcome message', async function () {
  await homePage.verifyWelcomeMessage();
});
