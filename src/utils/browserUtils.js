// utils/browserUtils.js

const { CONFIG } = require('./configUtils');

async function createBrowserContext(browser) {
  return await browser.newContext({
    viewport: {
      width: CONFIG.VIEWPORT_WIDTH,
      height: CONFIG.VIEWPORT_HEIGHT,
    },
    ignoreHTTPSErrors: true,
  });
}

async function closeBrowser(browser) {
  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      console.error('Failed to close the browser:', error);
    }
  }
}

module.exports = {
  createBrowserContext,
  closeBrowser,
};
