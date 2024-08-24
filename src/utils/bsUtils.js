const { chromium } = require('playwright');
const { captureAndAttachScreenshot } = require('./screenshotUtils');
const capabilities = require('../utils/browserstack-capabilities');

const CONFIG = {
  HEADLESS: process.env.HEADLESS === 'true',
  VIEWPORT_WIDTH: parseInt(process.env.VIEWPORT_WIDTH, 10),
  VIEWPORT_HEIGHT: parseInt(process.env.VIEWPORT_HEIGHT, 10),
};
async function setupBrowser(USE_BROWSERSTACK) {
  let browser;

  if (USE_BROWSERSTACK) {
    console.log('Using Browserstack...');
    for (const caps of capabilities) {
      caps['browserstack.username'] = process.env.BROWSERSTACK_USERNAME;
      caps['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY;

      try {
        browser = await chromium.connect({
          wsEndpoint:
            `wss://cdp.browserstack.com/playwright?caps=` +
            `${encodeURIComponent(JSON.stringify(caps))}`,
          headless: CONFIG.HEADLESS,
          viewport: {
            width: CONFIG.VIEWPORT_WIDTH,
            height: CONFIG.VIEWPORT_HEIGHT,
          },
        });
        console.log(`Running tests with ${caps.browser} on ${caps.os} ${caps.os_version}`);
      } catch (error) {
        console.error(
          `Failed to connect to BrowserStack for ${caps.browser} on ${caps.os} ${caps.os_version}:`,
          error,
        );
        throw error;
      }
    }
  } else {
    console.log('Running tests locally.');
    browser = await chromium.launch({
      headless: CONFIG.HEADLESS,
      viewport: {
        width: CONFIG.VIEWPORT_WIDTH,
        height: CONFIG.VIEWPORT_HEIGHT,
      },
    });
  }

  return browser;
}

async function handleBrowserStackLogic(
  scenario,
  context,
  page,
  screenshotsDir,
  USE_BROWSERSTACK,
  This,
) {
  const tags = extractTags(scenario);
  const status = scenario.result.status === 'PASSED' ? 'passed' : 'FAILED';
  const reason =
    status === 'passed'
      ? 'Test passed successfully'
      : `Test failed: ${scenario.result.exception?.message}`;

  if (USE_BROWSERSTACK && tags.includes('browserstack')) {
    await setBrowserStackSessionStatus(page, scenario, status, reason, tags);
  }

  if (status === 'FAILED') {
    const screenshot = await captureAndAttachScreenshot(page, scenario, screenshotsDir);
    if (screenshot) This.attach(screenshot, 'image/png');
  }

  if (page) await page.close();
  if (context) await context.close();
}

async function setBrowserStackSessionStatus(page, scenario, status, reason, tags) {
  try {
    await page.evaluate(
      // eslint-disable-next-line prettier/prettier, no-unused-vars
      (_) => { },
      `browserstack_executor: {
      "action": "setSessionStatus",
      "arguments": {
        "status": "${scenario.result.status}",
        "reason": "${scenario.result.status === 'PASSED' ? 'Test passed successfully' : 'Test failed'}",
        "name": "${scenario.pickle.name}",
        "build": "default-build",
        "project": "Test Project",
        "tags": ${JSON.stringify(tags)},
        "custom_data": {
          "environment": "${process.env.NODE_ENV}"
        }
      }
    }`,
    );
  } catch (error) {
    console.error('Failed to set BrowserStack session status:', error);
  }
}

function extractTags(scenario) {
  return scenario.pickle.tags.map((tag) => tag.name.replace('@', ''));
}

module.exports = {
  handleBrowserStackLogic,
  setupBrowser,
};
