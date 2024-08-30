// utils/testProcessUtils.js

const { handleTestRailResults } = require('./testRailUtils/testrailUtilsRefactored');
const { runAccessibilityTests } = require('./accessibilityUtils');
const { handleBrowserStackLogic } = require('./browserstackUtils/bsUtils');
const { scenarioHasTag } = require('./scenarioUtils');

async function handleAdditionalTestProcesses(
  page,
  scenario,
  context,
  CONFIG,
  caseIds,
  testResults,
) {
  if (CONFIG.USE_TESTRAIL) {
    await handleTestRailResults(page, scenario, CONFIG, caseIds, testResults);
  }

  if (CONFIG.USE_BROWSERSTACK) {
    await handleBrowserStackLogic(
      scenario,
      context,
      page,
      CONFIG.screenshotsDir,
      CONFIG.USE_BROWSERSTACK,
      this,
    );
  }

  if (CONFIG.USE_ACCESSIBILITY_TESTING && scenarioHasTag(scenario, ['@accessibility'])) {
    await runAccessibilityTests(page, scenario);
  }
}

module.exports = {
  handleAdditionalTestProcesses,
};
