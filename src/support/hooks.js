const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { setupBrowser, handleBrowserStackLogic } = require('../utils/browserstackUtils/bsUtils');
const { CONFIG } = require('../utils/configUtils');
const { runVisualTesting } = require('../utils/backstopConfig/visualTestingUtils');
const {
  handleTestRailResults,
  finalizeTestRailRun,
} = require('../utils/testRailUtils/testrailUtilsRefactored');
setDefaultTimeout(process.env.DEFAULT_TIMEOUT);

let browser;
let context;
let caseIds = [];
let testResults = [];

BeforeAll(async function () {
  browser = await setupBrowser(CONFIG.USE_BROWSERSTACK);
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
  if (CONFIG.USE_VISUAL_TESTING) {
    await runVisualTesting(this.page, scenario);
  }
  if (CONFIG.USE_TESTRAIL) {
    await handleTestRailResults(this.page, scenario, CONFIG, caseIds, testResults);
  }
  if (CONFIG.USE_BROWSERSTACK) {
    await handleBrowserStackLogic(
      scenario,
      context,
      this.page,
      CONFIG.screenshotsDir,
      CONFIG.USE_BROWSERSTACK,
      this,
    );
  }
});

AfterAll(async () => {
  if (CONFIG.USE_TESTRAIL) {
    await finalizeTestRailRun(CONFIG, caseIds, testResults);
  }

  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      console.error('Failed to close the browser:', error);
    }
  }
});
