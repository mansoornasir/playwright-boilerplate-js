const ObjectsProvider = require('./ObjectsProvider');
const LoginPage = require('../pages/Login.page');
const HomePage = require('../pages/Home.page');

async function setupTestContext(page) {
  const pageObjects = new ObjectsProvider(page);
  pageObjects.register('LoginPage', LoginPage);
  pageObjects.register('HomePage', HomePage);

  return { pageObjects };
}

module.exports = { setupTestContext };
