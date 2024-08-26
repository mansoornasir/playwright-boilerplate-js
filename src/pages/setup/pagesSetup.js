const ObjectsProvider = require('./ObjectsProvider');
const LoginPage = require('../Login.page');
const HomePage = require('../Home.page');

async function setupTestContext(page) {
  const pageObjects = new ObjectsProvider(page);
  pageObjects.register('LoginPage', LoginPage);
  pageObjects.register('HomePage', HomePage);

  return { pageObjects };
}

module.exports = { setupTestContext };
