// src/hooks/hooks.js

require('dotenv').config(); // Load environment variables from .env file
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
require('../step-definitions/ui/web/common.steps');
// Load configuration from environment variables
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

// Setup before each test
Before(async function () {
  context = await browser.newContext({
    viewport: {
      width: CONFIG.VIEWPORT_WIDTH,
      height: CONFIG.VIEWPORT_HEIGHT,
    },
    ignoreHTTPSErrors: true, // Example: Ignore HTTPS errors if needed
  });
  this.page = await context.newPage();
});

// Teardown after each test
After(async function () {
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
