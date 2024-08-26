const client_options = require('testrail-api-client').default;
const { saveScreenShot } = require('../utils/screenshotUtils');

const options = {
  domain: process.env.TESTRAIL_HOST,
  username: process.env.TESTRAIL_USERNAME,
  password: process.env.TESTRAIL_APIKEY,
};

const client = new client_options(options);

const addRun = async (runName, runDescription, projectId, testSuiteId, caseIds = []) => {
  // const runName = 'Example Run Name';
  // const runDescription = 'Example Run Description';
  // const projectId = 20;
  // const testSuiteId = 22; // optional
  // const caseIds = [925, 926, 927]; // optional
  try {
    const runId = await client.addRun(runName, runDescription, projectId, testSuiteId, caseIds);
    // console.log(`Created run with id: ${runId}`);
    return runId;
  } catch (error) {
    // console.error(error);
    throw error; // rethrow the error if you want to handle it elsewhere
  }
};

const addResultsForCases = async (runId, reportTests) => {
  // const reportTests = [{ case_id: 12345, status_id: 1, comment: 'Test comment' }];
  client
    .addResultsForCases(runId, reportTests)
    .then(() => {
      console.log('Test Status Updated on Test Rail');
    })
    .catch((err) => {
      console.log(err);
    });
};

const addAttachmentToResult = async (runId, screenshotPath) => {
  client
    .addAttachmentToResult(runId, screenshotPath)
    .then(() => {
      console.log('Done attaching screenshot to the test case');
    })
    .catch((err) => {
      console.log(err);
    });
};
const getTests = async () => {
  client
    .getTests(runId)
    .then(function (cases) {
      console.log(`Number of cases from run #${runId}: ${cases.length}`);
    })
    .catch((error) => console.error(error));
};

const getCases = async (projectId, suiteId) => {
  client
    .getCases(projectId, suiteId)
    .then(function (cases) {
      console.log(`Number of cases in suiteid=${suiteId}: ${cases.length}`);
    })
    .catch((error) => console.error(error));
};

const updateRunDescription = async (runId, description) => {
  client
    .updateRunDescription(runId, description)
    .then(() => {
      console.log('Done Updating Test run description in Testrail');
    })
    .catch((err) => {
      console.log(err);
    });
};

const closeRun = async (runId) => {
  client
    .closeRun(runId)
    .then(console.log(`Closed run with id: ${runId}`))
    .catch((error) => console.error(error));
};

const setTestRailResultsForKnowTestRun = async (page, scenario, CONFIG) => {
  if (CONFIG.USE_TESTRAIL && CONFIG.TESTRAIL_TESTRUN_ID) {
    // this is in case we are using already created testrun with TEST_ID defined in .env
    const caseId = scenario.pickle.tags
      .find((tag) => tag.name.startsWith('@C'))
      ?.name.replace('@C', '');
    const statusId = scenario.result.status === 'PASSED' ? 1 : 5; // 1 for Passed, 5 for Failed
    scenario.result.status === 'PASSED'
      ? (comment = 'Test passed successfully')
      : (comment = `Test failed at step : ${scenario.pickle.steps.map((step) => step.text)} \n\n ${scenario.result.message} `);

    if (scenario.result.status === 'FAILED' && CONFIG.TESTRAIL_UPLOAD_SCREENSHOT) {
      const screenshotPath = await saveScreenShot(page, scenario, CONFIG.screenshotsDir);
      addAttachmentToResult(CONFIG.TESTRAIL_TESTRUN_ID, screenshotPath);
    }
    if (scenario.result.status === 'PASSED' && CONFIG.TESTRAIL_UPLOAD_SCREENSHOT) {
      const screenshotPath = await saveScreenShot(page, scenario, CONFIG.screenshotsDir);
      addAttachmentToResult(CONFIG.TESTRAIL_TESTRUN_ID, screenshotPath);
    }
    if (caseId) {
      const test_report = [{ case_id: caseId, status_id: statusId, comment: comment }];
      await addResultsForCases(process.env.TESTRAIL_TESTRUN_ID, test_report);
    }
  }
};

module.exports = {
  addRun,
  addResultsForCases,
  addAttachmentToResult,
  getTests,
  getCases,
  updateRunDescription,
  closeRun,
  setTestRailResultsForKnowTestRun,
};
