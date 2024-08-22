const locators = require('../locators/locators');
const data = require('../data/test-data');
const BasePage = require('./Base.page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateToLoginPage(url) {
    await this.goto(url);
  }
  async loginWithValidCredentials() {
    await this.isVisible(locators.home.logo);
    await this.fill(locators.signin.emailField, data.cust.email);
    await this.fill(locators.signin.passwordField, data.cust.password);
    await this.click(locators.signin.loginBtn);
    await this.isVisible(locators.dashboard.accountSettingsText);
    await this.page.waitForTimeout(5000); // Waits for 10 seconds
  }
}

module.exports = LoginPage;
