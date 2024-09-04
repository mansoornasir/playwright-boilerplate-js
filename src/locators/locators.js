const dashboardLoc = require('./pageLocators/dashboard.loc');

const locators = {
  home: require('./pageLocators/home.loc'),
  search: {
    productImage: 'img.tile-image',
  },
  signin: {
    emailField: '#login-form-email',
    passwordField: '#login-form-password',
    loginBtn: '.login-btn',
  },
  pets: require('./pageLocators/pets.loc'),
  header: require('./pageLocators/header.loc'),
  cart: require('./pageLocators/cart.loc'),
  plp: require('./pageLocators/plp.loc'),
  signin: require('./pageLocators/signin.loc'),
  dashboard: require('./pageLocators/dashboard.loc'),
  pdp: require('./pageLocators/pdp.loc'),
};

module.exports = locators;
