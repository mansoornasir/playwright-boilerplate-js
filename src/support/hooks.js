const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { setupBrowser, handleBrowserStackLogic } = require('../utils/bsUtils');
require('../step-definitions/ui/web/common.steps');
setDefaultTimeout(process.env.DEFAULT_TIMEOUT);

const CONFIG = {
  VIEWPORT_WIDTH: parseInt(process.env.VIEWPORT_WIDTH, 10),
  VIEWPORT_HEIGHT: parseInt(process.env.VIEWPORT_HEIGHT, 10),
  screenshotsDir: process.cwd() + '/reports/screenshots/',
};

const USE_BROWSERSTACK = process.env.USE_BROWSERSTACK === 'true';
let browser;
let context;

BeforeAll(async function () {
  browser = await setupBrowser(USE_BROWSERSTACK);
});

Before(async function () {
  context = await browser.newContext({
    viewport: {
      width: CONFIG.VIEWPORT_WIDTH,
      height: CONFIG.VIEWPORT_HEIGHT,
    },
    ignoreHTTPSErrors: true,
  });
  this.page = await context.newPage();
});

After(async function (scenario) {
  await handleBrowserStackLogic(
    scenario,
    context,
    this.page,
    CONFIG.screenshotsDir,
    USE_BROWSERSTACK,
    this,
  );
});

AfterAll(async () => {
  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      console.error('Failed to close the browser:', error);
    }
  }
});
