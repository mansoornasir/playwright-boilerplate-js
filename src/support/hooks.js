const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { setupBrowser, handleBrowserStackLogic } = require('../utils/browserstackUtils/bsUtils');
const { CONFIG } = require('../utils/configUtils');
const {
  handleTestRailResults,
  finalizeTestRailRun,
} = require('../utils/testRailUtils/testrailUtilsRefactored');
const { runAccessibilityTests } = require('../utils/accessibilityUtils'); // Import the new utility function
const { scenarioHasTag } = require('../utils/helpers');

setDefaultTimeout(process.env.DEFAULT_TIMEOUT);

let browser;
let context;
let caseIds = [];
let testResults = [];

BeforeAll(async function () {
  browser = await setupBrowser(CONFIG.USE_BROWSERSTACK);
});

Before(async function (scenario) {
  context = await browser.newContext({
    viewport: {
      width: CONFIG.VIEWPORT_WIDTH,
      height: CONFIG.VIEWPORT_HEIGHT,
    },
    ignoreHTTPSErrors: true,
  });
  this.page = await context.newPage();
  if (CONFIG.USE_VISUAL_TESTING && scenarioHasTag(scenario, ['@visual'])) {
    console.warn('Visual Testing in progress...');
    // await runVisualTesting(this.page, scenario);
  }
});

After(async function (scenario) {
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
  if (CONFIG.USE_ACCESSIBILITY_TESTING && scenarioHasTag(scenario, ['@accessibility'])) {
    await runAccessibilityTests(this.page, scenario);
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
