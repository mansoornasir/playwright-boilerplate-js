const locators = {
  home: {
    url: process.env.BASE_URL,
    logo: '.logo-home',
    searchField: '#search-results',
    signinUrl: 'https://sfcc.petfoodking.com/signin',
  },
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
};

module.exports = locators;
