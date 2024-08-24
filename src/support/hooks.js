// src/hooks/hooks.js

const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { setupTestContext } = require('./pagesSetup');
require('../step-definitions/ui/web/common.steps');
const capabilities = require('./browserstack-capabilities');

setDefaultTimeout(60 * 1000);

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
  const caps = capabilities[0];
  // Add BrowserStack credentials to the capability dynamically
  caps['browserstack.username'] = process.env.BROWSERSTACK_USERNAME;
  caps['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY;
  // Launch browser
  browser = await chromium.connect({
    wsEndpoint:
      `wss://cdp.browserstack.com/playwright?caps=` + `${encodeURIComponent(JSON.stringify(caps))}`,
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
  await this.page.evaluate(
    // eslint-disable-next-line prettier/prettier
    (_) => { },
    `browserstack_executor: {
    "action": "setSessionStatus", 
    "arguments": {
      "status": "${scenario.result.status}",
      "reason": "All tests passed successfully",
      "name": "${scenario.pickle.name}",
      "build": "default-build",
      "project": "Test Project",
      "tags": ["smoke", "login", "chrome"],
      "custom_data": {
        "module": "Authentication",
        "feature": "Login",
        "environment": "${process.env.NODE_ENV}"
      }
    }
  }`,
  );

  if (scenario.result.status === 'PASSED') {
    console.log(scenario.pickle.name);
  }
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
