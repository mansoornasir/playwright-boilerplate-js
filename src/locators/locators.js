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
  dashboard: {
    url: 'https://sfcc.petfoodking.com/account?registration=false',
    accountSettingsText: '.profile-header',
    accountSettingsIcon: '.profile-settings-img img',
  },
  pets: require('./pageLocators/pets.loc'),
};

module.exports = locators;
