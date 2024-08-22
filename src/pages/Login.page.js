const locators = require('../locators/locators');
const data = require('../data/test-data');
const BasePage = require('./Base.page');
const path = require('path');
const fs = require('fs');
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateToLoginPage(url) {
    await this.goto(url);
  }
  async loginWithValidCredentials() {
    if (await this.loadCookies(this.page)) {
      await this.goto(locators.dashboard.url);
      if (await this.waitForVisible(locators.dashboard.accountSettingsIcon)) {
        this.login();
      }
    } else {
      this.login();
    }
  }

  async login() {
    await this.isVisible(locators.home.logo);
    await this.fill(locators.signin.emailField, data.cust.email);
    await this.fill(locators.signin.passwordField, data.cust.password);
    await this.click(locators.signin.loginBtn);
    await this.waitForPageToLoad();
    await this.waitForVisible(locators.dashboard.accountSettingsIcon);
    // Get cookies after login
    const cookies = await this.page.context().cookies();

    // Save cookies to a file
    const cookiesPath = path.resolve(process.cwd() + '/src/data/', 'cookies.json');
    fs.writeFileSync(cookiesPath, JSON.stringify(cookies));
  }
  async loadCookies() {
    const cookiesPath = path.resolve(process.cwd() + '/src/data/', 'cookies.json');
    console.log(cookiesPath);
    if (fs.existsSync(cookiesPath)) {
      const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
      await this.page.context().addCookies(cookies);
      return true;
    }
  }
}
module.exports = LoginPage;
