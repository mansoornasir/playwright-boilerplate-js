// src/utils/testrailUtilsRefactored.js

const { setTestRailResultsForKnowTestRun, addRun, addResultsForCases } = require('./testrailUtils');
const { getTagNumber } = require('../helpers');

async function handleTestRailResults(page, scenario, config, caseIds, testResults) {
  if (config.USE_TESTRAIL && config.TESTRAIL_TESTRUN_ID) {
    await setTestRailResultsForKnowTestRun(page, scenario, config);
  } else if (config.USE_TESTRAIL && !config.TESTRAIL_TESTRUN_ID) {
    const statusId = scenario.result.status === 'PASSED' ? 1 : 5; // 1 for Passed, 5 for Failed
    const comment =
      scenario.result.status === 'PASSED'
        ? 'Test passed successfully'
        : `Test failed at step : ${scenario.pickle.steps.map(
            (step) => step.text + '\n',
          )} \n\n ${scenario.result.message} `;
    const caseId = await getTagNumber(scenario);
    caseIds.push(caseId);
    testResults.push({ case_id: caseId, status_id: statusId, comment: comment });
  }
}

async function finalizeTestRailRun(config, caseIds, testResults) {
  if (config.USE_TESTRAIL) {
    if (!config.TESTRAIL_TESTRUN_ID) {
      config.RUN_ID = await addRun(
        `Regression: ${new Date().toLocaleString()}`,
        'Regression',
        config.TESTRAIL_PROJECT_ID,
        config.TESTRAIL_SUITE_ID,
        caseIds,
      );
      console.log('Test run created;' + config.RUN_ID);
    }
    testResults.forEach((result) => {
      addResultsForCases(config.RUN_ID, [result]);
    });
  }
}

module.exports = { handleTestRailResults, finalizeTestRailRun };
