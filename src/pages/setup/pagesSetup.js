const ObjectsProvider = require('./ObjectsProvider');
const HomePage = require('../Home.page');

async function setupTestContext(page) {
  const pageObjects = new ObjectsProvider(page);
  pageObjects.register('HomePage', HomePage);

  return { pageObjects };
}

module.exports = { setupTestContext };
