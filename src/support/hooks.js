const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { setupBrowser } = require('../utils/browserstackUtils/bsUtils');
const { CONFIG } = require('../utils/configUtils');
const {
  validateScenarioTag,
  getCaseIdAndStatus,
  shouldRunVisualTesting,
} = require('../utils/scenarioUtils');
const {
  initializeWorkbook,
  updateTestResultInWorksheet,
  saveWorkbook,
} = require('../utils/excelUtils');
const { finalizeTestRailRun } = require('../utils/testRailUtils/testrailUtilsRefactored');
const { createBrowserContext, closeBrowser } = require('../utils/browserUtils');
const { handleAdditionalTestProcesses } = require('../utils/testProcessUtils');

setDefaultTimeout(process.env.DEFAULT_TIMEOUT);

let browser;
let context;
let caseIds = [];
let testResults = [];
let workbook, worksheet, filePath;

BeforeAll(async function () {
  browser = await setupBrowser(CONFIG.USE_BROWSERSTACK);

  if (CONFIG.USE_EXCEL_REPORTS) {
    console.warn('Using Excel reporting...');
    ({ workbook, worksheet, filePath } = await initializeWorkbook());
  }
});

Before(async function (scenario) {
  validateScenarioTag(scenario);
  context = await createBrowserContext(browser);
  this.page = await context.newPage();

  if (shouldRunVisualTesting(scenario)) {
    console.warn('Visual Testing in progress...');
    // await runVisualTesting(this.page, scenario);
  }
});

After(async function (scenario) {
  const { caseId, status } = getCaseIdAndStatus(scenario);

  if (CONFIG.USE_EXCEL_REPORTS && caseId) {
    updateTestResultInWorksheet(worksheet, caseId, status);
  }

  await handleAdditionalTestProcesses(this.page, scenario, context, CONFIG, caseIds, testResults);
});

AfterAll(async () => {
  if (CONFIG.USE_EXCEL_REPORTS) {
    await saveWorkbook(workbook, filePath);
  }

  if (CONFIG.USE_TESTRAIL) {
    await finalizeTestRailRun(CONFIG, caseIds, testResults);
  }

  await closeBrowser(browser);
});
