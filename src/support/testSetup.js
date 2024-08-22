const PageObjectFactory = require('../pages/PageObjectFactory');
const LoginPage = require('../pages/Login.page');
const HomePage = require('../pages/Home.page');

async function setupTestContext(page) {
  const pageObjectFactory = new PageObjectFactory(page);
  pageObjectFactory.register('LoginPage', LoginPage);
  pageObjectFactory.register('HomePage', HomePage);

  return { pageObjectFactory };
}

module.exports = { setupTestContext };
