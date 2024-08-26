const dotenv = require('dotenv'); // Load environment variables from .env file
dotenv.config();
const path = require('path');
const environment = process.env.NODE_ENV;
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });

const common = [
  '--require ./src/step-definitions/**/*.js',
  '--require ./src/support/hooks.js',
  './features/**/*.feature',
  '--format json:./reports/cucumber_report.json'
];
if (process.env.USE_ALLURE === "true") {
  common.push('--format @cucumber/pretty-formatter');
  common.push('--format ./src/support/allure-reporter.js:./reports/allure-results');
} else {
  common.push('--format @cucumber/pretty-formatter');
  common.push(`--format ${process.env.REPORT_FORMAT}`);
}

module.exports = {
  default: common.join(' '),
  parallel: common.concat(['--parallel 6']).join(' '),  // Parallel execution with 4 threads
};