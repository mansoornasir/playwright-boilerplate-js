var reporter = require('cucumber-html-reporter');
require('dotenv').config();
var options = {
  theme: 'bootstrap',
  jsonFile: './reports/cucumber_report.json',
  output: './reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '-',
    'Test Environment': process.env.NODE_ENV,
    // Browser: 'Chrome  54.0.2840.98',
    // Platform: 'Windows 10',
    // Parallel: 'Scenarios',
    // Executed: 'Remote',
  },
  failedSummaryReport: true,
};

reporter.generate(options);
