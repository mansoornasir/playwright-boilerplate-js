const AllureCucumberReporter = require('allure-cucumberjs/reporter');

module.exports = AllureCucumberReporter;

// const { CucumberJSAllureFormatter } = require('allure-cucumberjs');
// const { AllureRuntime } = require('allure-js-commons');

// const path = require('path');

// class Reporter extends CucumberJSAllureFormatter {
//   constructor(options) {
//     super(
//       options,
//       new AllureRuntime({ resultsDir: path.resolve(__dirname, '../../allure-results') }),
//       {},
//     );
//   }
// }

// module.exports.Reporter = Reporter;

// const { AllureRuntime } = require('allure-js-commons');
// const { CucumberJSAllureFormatter } = require('allure-cucumberjs');

// class MyCucumberJSAllureFormatter extends CucumberJSAllureFormatter {
//   constructor(options) {
//     super(options, new AllureRuntime({ resultsDir: './allure-results' }), {
//       labels: [
//         {
//           pattern: [/@feature:(.*)/],
//           name: 'epic',
//         },
//         {
//           pattern: [/@severity:(.*)/],
//           name: 'severity',
//         },
//       ],
//       links: [
//         {
//           pattern: [/@issue=(.*)/],
//           type: 'issue',
//           urlTemplate: 'http://localhost:8080/issue/%s',
//         },
//         {
//           pattern: [/@testcases=(.*)/],
//           type: 'testcases',
//           urlTemplate: 'http://localhost:8080/testcases/%s',
//         },
//       ],
//     });
//   }
// }
// module.exports = MyCucumberJSAllureFormatter;
