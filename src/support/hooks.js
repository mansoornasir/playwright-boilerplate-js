const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { setupBrowser, handleBrowserStackLogic } = require('../utils/bsUtils');
require('../step-definitions/ui/web/common.steps');
const {
  setTestRailResultsForKnowTestRun,
  addRun,
  addResultsForCases,
} = require('../utils/testrailUtils');
const { getTagNumber } = require('../utils/helpers');

setDefaultTimeout(process.env.DEFAULT_TIMEOUT);

const CONFIG = {
  BROWSER: process.env.BROWSER,
  VIEWPORT_WIDTH: parseInt(process.env.VIEWPORT_WIDTH, 10),
  VIEWPORT_HEIGHT: parseInt(process.env.VIEWPORT_HEIGHT, 10),
  screenshotsDir: process.cwd() + '/reports/screenshots/',
  USE_TESTRAIL: process.env.USE_TESTRAIL === 'true',
  TESTRAIL_PROJECT_ID: parseInt(process.env.TESTRAIL_PROJECT_ID),
  TESTRAIL_SUITE_ID: parseInt(process.env.TESTRAIL_SUITE_ID),
  TESTRAIL_TESTRUN_ID: parseInt(process.env.TESTRAIL_TESTRUN_ID),
  TESTRAIL_UPLOAD_SCREENSHOT: process.env.TESTRAIL_UPLOAD_SCREENSHOT === 'true',
  RUN_ID: null,
};

const USE_BROWSERSTACK = process.env.USE_BROWSERSTACK === 'true';
let browser;
let context;
let caseIds = [];
let testResults = [];
BeforeAll(async function () {
  browser = await setupBrowser(USE_BROWSERSTACK);
  // if TESTRAIL_TESTRUN_ID is not defined, then run this
  // this means that TESTRAIL_TESTRUN_ID is not known and we are creating new runs based on some custom tags
});

Before(async function () {
  // if (CONFIG.USE_TESTRAIL && !CONFIG.TESTRAIL_TESTRUN_ID) {
  // }

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
    const statusId = scenario.result.status === 'PASSED' ? 1 : 5; // 1 for Passed, 5 for Failed
    scenario.result.status === 'PASSED'
      ? (comment = 'Test passed successfully')
      : (comment = `Test failed at step : ${scenario.pickle.steps.map((step) => step.text + '\n')} \n\n ${scenario.result.message} `);
    const caseId = await getTagNumber(scenario);
    caseIds.push(caseId);
    testResults.push({ case_id: caseId, status_id: statusId, comment: comment });
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
  if (CONFIG.USE_TESTRAIL) {
    if (!CONFIG.TESTRAIL_TESTRUN_ID && CONFIG.USE_TESTRAIL) {
      CONFIG.RUN_ID = await addRun(
        `Regression: ${new Date().toLocaleString()}`,
        'Regression',
        CONFIG.TESTRAIL_PROJECT_ID,
        CONFIG.TESTRAIL_SUITE_ID,
        caseIds,
      );
    }
    console.log('Test run created;' + CONFIG.RUN_ID);
    testResults.forEach((result) => {
      addResultsForCases(CONFIG.RUN_ID, [result]);
    });
  }
  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      console.error('Failed to close the browser:', error);
    }
  }
});
