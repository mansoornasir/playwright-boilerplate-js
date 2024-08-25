const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { setupBrowser, handleBrowserStackLogic } = require('../utils/bsUtils');
require('../step-definitions/ui/web/common.steps');
const { setTestRailResults } = require('../utils/testrailUtils');
setDefaultTimeout(process.env.DEFAULT_TIMEOUT);

const CONFIG = {
  VIEWPORT_WIDTH: parseInt(process.env.VIEWPORT_WIDTH, 10),
  VIEWPORT_HEIGHT: parseInt(process.env.VIEWPORT_HEIGHT, 10),
  screenshotsDir: process.cwd() + '/reports/screenshots/',
  TESTRAIL_PROJECT_ID: parseInt(process.env.TESTRAIL_PROJECT_ID),
  TESTRAIL_SUITE_ID: parseInt(process.env.TESTRAIL_SUITE_ID),
  TESTRAIL_TESTRUN_ID: parseInt(process.env.TESTRAIL_TESTRUN_ID),
  TESTRAIL_UPLOAD_SCREENSHOT: process.env.TESTRAIL_UPLOAD_SCREENSHOT === 'true',
  USE_TESTRAIL: process.env.USE_TESTRAIL === 'true',
};

const USE_BROWSERSTACK = process.env.USE_BROWSERSTACK === 'true';
let browser;
let context;

BeforeAll(async function () {
  browser = await setupBrowser(USE_BROWSERSTACK);
});

Before(async function () {
  // Create a new TestRail test run if TestRail integration is enabled
  if (CONFIG.USE_TESTRAIL) {
    // // Collect case IDs from your features/scenarios
    // // Assuming tags follow the format '@C1234' where 1234 is the case ID
    // scenario.pickle.tags.forEach((tag) => {
    //   if (tag.name.startsWith('@C')) {
    //     console.log(tag.name.slice(2), 10);
    //     // caseIds.push(parseInt(tag.name.slice(2), 10));
    //   }
    // });
    // testRunId = await createTestRun(
    //   CONFIG.TESTRAIL_PROJECT_ID,
    //   CONFIG.TESTRAIL_SUITE_ID,
    //   'Automated Test Run',
    // );
  }

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
  await setTestRailResults(this.page, scenario, CONFIG);
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
  if (CONFIG.USE_TESTRAIL === 'true') {
    closeRun();
  }
  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      console.error('Failed to close the browser:', error);
    }
  }
});
