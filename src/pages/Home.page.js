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

  async searchForProduct(productName) {
    await this.fill(locators.home.searchField, productName);
    await this.click(locators.home.searchIcon);
    await this.waitForPageToLoad();
  }

  async logout() {
    await this.click(locators.header.myAccountMenue);
    await this.click(locators.header.signOut);
  }
}

module.exports = HomePage;
