const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { setupBrowser, handleBrowserStackLogic } = require('../utils/bsUtils');
require('../step-definitions/ui/web/common.steps');
const {
  setTestRailResultsForKnowTestRun,
  addRun,
  addResultsForCases,
} = require('../utils/testrailUtils');
setDefaultTimeout(process.env.DEFAULT_TIMEOUT);

const CONFIG = {
  VIEWPORT_WIDTH: parseInt(process.env.VIEWPORT_WIDTH, 10),
  VIEWPORT_HEIGHT: parseInt(process.env.VIEWPORT_HEIGHT, 10),
  screenshotsDir: process.cwd() + '/reports/screenshots/',
  USE_TESTRAIL: process.env.USE_TESTRAIL === 'true',
  TESTRAIL_PROJECT_ID: parseInt(process.env.TESTRAIL_PROJECT_ID),
  TESTRAIL_SUITE_ID: parseInt(process.env.TESTRAIL_SUITE_ID),
  TESTRAIL_TESTRUN_ID: parseInt(process.env.TESTRAIL_TESTRUN_ID),
  TESTRAIL_UPLOAD_SCREENSHOT: process.env.TESTRAIL_UPLOAD_SCREENSHOT === 'true',
  runId: null,
};

const USE_BROWSERSTACK = process.env.USE_BROWSERSTACK === 'true';
let browser;
let context;

BeforeAll(async function () {
  browser = await setupBrowser(USE_BROWSERSTACK);
  // if TESTRAIL_TESTRUN_ID is not defined, then run this
  // this means that TESTRAIL_TESTRUN_ID is not known and we are creating new runs based on some custom tags
  if (!CONFIG.TESTRAIL_TESTRUN_ID && CONFIG.USE_TESTRAIL) {
    CONFIG.runId = await addRun(
      `Regression: ${new Date().toLocaleString()}`,
      'General Regression',
      CONFIG.TESTRAIL_PROJECT_ID,
      CONFIG.TESTRAIL_SUITE_ID,
    );
  }
});

Before(async function () {
  // Create a new TestRail test run if TestRail integration is enabled
  if (CONFIG.USE_TESTRAIL && !CONFIG.TESTRAIL_TESTRUN_ID) {
    console.log('RUN ID IS : ' + CONFIG.runId);
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
  if (CONFIG.USE_TESTRAIL && CONFIG.TESTRAIL_TESTRUN_ID) {
    await setTestRailResultsForKnowTestRun(this.page, scenario, CONFIG);
  } else if (CONFIG.USE_TESTRAIL && !CONFIG.TESTRAIL_TESTRUN_ID) {
    if (scenario.result.status === 'PASSED')
      scenario.pickle.tags.forEach(async (tag) => {
        if (tag.name.startsWith('@C')) {
          const caseId = parseInt(tag.name.slice(2), 10);
          const reportTests = [
            { case_id: caseId, status_id: 1, comment: 'Test passed successfully' },
          ];
          await addResultsForCases(CONFIG.runId, reportTests);
        }
      });
  }

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
