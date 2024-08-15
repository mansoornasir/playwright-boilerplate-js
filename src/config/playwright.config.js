// src/config/playwright.config.js

const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config(); // Load environment variables from .env file

const BASE_URL = process.env.BASE_URL;
const TIMEOUT = parseInt(process.env.PAGE_LOAD_TIMEOUT, 10) || 30000;
const RETRY = parseInt(process.env.RETRY_COUNT, 10) || 1;
const HEADLESS = process.env.HEADLESS !== 'false';
const VIEWPORT_WIDTH = parseInt(process.env.VIEWPORT_WIDTH, 10) || 1280;
const VIEWPORT_HEIGHT = parseInt(process.env.VIEWPORT_HEIGHT, 10) || 720;

module.exports = defineConfig({
  timeout: TIMEOUT,
  retries: RETRY,
  reporter: [
    ['list'],
    // ['json', { outputFile: 'reports/results.json' }],
    // ['html', { outputFolder: 'reports/html-report' }],
    ['allure-playwright', { outputFolder: 'reports/allure-report' }],
  ],
  use: {
    baseURL: BASE_URL,
    headless: HEADLESS,
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
    actionTimeout: TIMEOUT,
    trace: 'on', // Enable tracing for debugging purposes
    video: 'on', // Capture video of test runs
    screenshot: 'on', // Capture screenshots of failed tests
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //     name: 'Mobile Safari',
    //     use: { ...devices['iPhone 12'] },
    // },
    // Add more projects for different browsers or devices as needed
  ],
  // Optionally, you can add a global setup file if needed
  // globalSetup: require.resolve('./global-setup'),
});
