const HomePageLocators = require('../locators/locators');
const BasePage = require('./Base.page');
const { Given, Then } = require('@cucumber/cucumber');
/**
 *
 *
 * @class HomePage
 * @extends {BasePage}
 */
class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateToHomePage(url) {
    await this.goto(url);
  }
  async verifyWelcomeMessage() {
    await this.isVisible(HomePageLocators.logo);
  }
}

module.exports = HomePage;
