const path = require('path');

const CONFIG = {
  BROWSER: process.env.BROWSER,
  VIEWPORT_WIDTH: parseInt(process.env.VIEWPORT_WIDTH, 10),
  VIEWPORT_HEIGHT: parseInt(process.env.VIEWPORT_HEIGHT, 10),
  screenshotsDir: path.join(process.cwd(), '/reports/screenshots/'),
  USE_TESTRAIL: process.env.USE_TESTRAIL === 'true',
  TESTRAIL_PROJECT_ID: parseInt(process.env.TESTRAIL_PROJECT_ID),
  TESTRAIL_SUITE_ID: parseInt(process.env.TESTRAIL_SUITE_ID, 10),
  TESTRAIL_TESTRUN_ID: parseInt(process.env.TESTRAIL_TESTRUN_ID, 10),
  TESTRAIL_UPLOAD_SCREENSHOT: process.env.TESTRAIL_UPLOAD_SCREENSHOT === 'true',
  USE_VISUAL_TESTING: process.env.USE_VISUAL_TESTING === 'true',
  USE_BROWSERSTACK: process.env.USE_BROWSERSTACK === 'true',
  USE_ACCESSIBILITY_TESTING: process.env.USE_ACCESSIBILITY_TESTING === 'true',
  RUN_ID: null,
};

module.exports = { CONFIG };
