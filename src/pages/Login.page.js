const locators = require('../locators/locators');
const BasePage = require('./Base.page');

/**
 *
 *
 * @class HomePage
 * @extends {BasePage}
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async login(email, password) {
    await this.fill(locators.signin.loginEmail, email);
    await this.fill(locators.signin.loginPassword, password);
    await this.click(locators.signin.loginBtn);
    await this.waitForPageToLoad();
  }
}

module.exports = LoginPage;
