require('dotenv').config(); // Load environment variables from .env file
const locators = {
  home: {
    logo: '.login_logo',
    url: 'https://saucedemo.com',
    loginBtn: '#login-button',
  },
  login: {
    url: process.env.BASE_URL+'signin',
    emailField: '#login-form-email',
    passwordField: "#login-form-password",
    loginBtn: 'button[title="login form"]',
  },
  checkout: {
    loginBtn: '#login-button',
  },
};

module.exports = locators;
