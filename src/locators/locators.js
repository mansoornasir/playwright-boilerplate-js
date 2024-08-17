require('dotenv').config(); // Load environment variables from .env file
const locators = {
  home: {
    logo: '.login_logo',
    overview: 'li.account-nav-item.active'
  },
  login: {
    url: process.env.BASE_URL+'signin',
    emailField: '#login-form-email',
    passwordField: "#login-form-password",
    loginBtn: 'button[title="login form"]',
  },
  signup: {
    url: process.env.BASE_URL+'signin',
    firstNameField: "label[for='registration-form-fname']",
    lastNameField: "label[for='registration-form-lname']",
    emailAddressField: "label[for='registration-form-email']",
    passwordField: "label[for='registration-form-password']",
    repeatPasswordField: "label[for='registration-form-password-confirm']",
    createAccountBtn: "button[title='Register']",
    DupEmailValidationMessage: "div#form-email-error.invalid-feedback"
  },
  checkout: {
    loginBtn: '#login-button',
  },
};

module.exports = locators;
