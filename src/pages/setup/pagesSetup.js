const ObjectsProvider = require('./ObjectsProvider');
const HomePage = require('../Home.page');
const LoginPage = require('../Login.page');

async function setupTestContext(page) {
  const pageObjects = new ObjectsProvider(page);
  pageObjects.register('HomePage', HomePage);
  pageObjects.register('LoginPage', LoginPage);

  return { pageObjects };
}

module.exports = { setupTestContext };
