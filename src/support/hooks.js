// src/hooks/hooks.js

const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { setupTestContext } = require('./pagesSetup');
require('../step-definitions/ui/web/common.steps');

const CONFIG = {
  HEADLESS: process.env.HEADLESS === 'true',
  VIEWPORT_WIDTH: parseInt(process.env.VIEWPORT_WIDTH, 10) || 1280,
  VIEWPORT_HEIGHT: parseInt(process.env.VIEWPORT_HEIGHT, 10) || 720,
  PAGE_LOAD_TIMEOUT: parseInt(process.env.PAGE_LOAD_TIMEOUT, 10) || 30000,
  ELEMENT_VISIBLE_TIMEOUT: parseInt(process.env.ELEMENT_VISIBLE_TIMEOUT, 10) || 10000,
};
// Global state
let browser;
let context;
const root = path.resolve(process.cwd());
// Ensure the screenshots directory exists
const screenshotsDir = root + '\\reports\\screenshots\\';
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

// Setup before all tests
BeforeAll(async () => {
  // Launch browser
  browser = await chromium.launch({
    headless: CONFIG.HEADLESS,
    viewport: {
      width: CONFIG.VIEWPORT_WIDTH,
      height: CONFIG.VIEWPORT_HEIGHT,
    },
  });
});

Before(async function () {
  context = await browser.newContext({
    viewport: {
      width: CONFIG.VIEWPORT_WIDTH,
      height: CONFIG.VIEWPORT_HEIGHT,
    },
    ignoreHTTPSErrors: true, // Example: Ignore HTTPS errors if needed
  });
  this.page = await context.newPage();
  const { pageObjects } = await setupTestContext(this.page);
  this.allPageObjects = pageObjects;

  // Initialize all used Page Objects
  this.pages = this.allPageObjects.initializeAll();
});

// Teardown after each test
After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    // Capture a screenshot
    const screenshotPath = screenshotsDir + `${scenario.pickle.name}-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath });
    // Attach the screenshot to the Allure report
    this.attach(fs.readFileSync(screenshotPath), 'image/png');
  }
  if (this.page) {
    await this.page.close();
  }

  if (context) {
    await context.close();
  }
});

// Teardown after all tests
AfterAll(async () => {
  if (browser) {
    await browser.close();
  }
});
