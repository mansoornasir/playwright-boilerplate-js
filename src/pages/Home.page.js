const locators = require('../locators/locators');
const BasePage = require('./Base.page');

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
    await this.isVisible(locators.home.logo);
  }
}

module.exports = HomePage;
