// TODO
// I NEED TO REFACTOR THIS TO WORK WITH NOT common but with the commented section


const dotenv = require('dotenv'); // Load environment variables from .env file
dotenv.config();
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });

const common = [
  '--require ./src/step-definitions/**/*.js',
  '--require ./src/support/hooks.js',
  './features/**/*.feature',
  '--publish-quiet',
  '--format json:./reports/results.json'
];
if (process.env.USE_ALLURE === "true") {
  common.push('--format @cucumber/pretty-formatter');
  common.push('--format ./src/support/allure-reporter.js:./reports/allure-results');
} else {
  common.push(`--format ${process.env.REPORT_FORMAT}`);
}

module.exports = {
  default: common.join(' '),
  // parallel: common.concat(['--parallel 2']).join(' '),  // Parallel execution with 4 threads
};