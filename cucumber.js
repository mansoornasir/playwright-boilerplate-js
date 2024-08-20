
const common = [
  '--require ./src/step-definitions/**/*.js',        // Load step definitions
  '--require ./src/support/hooks.js',               // Load hooks
  '--format ./src/support/allure-reporter.js',      // Show a progress bar during execution
  './features/**/*.feature',                    // Path to your feature files
  '--publish-quiet',                                // Don't print the publishing message
];

module.exports = {
  default: common.join(' '),
  // parallel: common.concat(['--parallel 2']).join(' '),  // Parallel execution with 4 threads
};

// module.exports = {
//   default: {
//     formatOptions: {
//       links: [
//         {
//           pattern: [/@issue=(.*)/],
//           type: "issue",
//           urlTemplate: "https://example.com/issues/%s",
//           nameTemplate: "Issue: %s",
//         },
//         {
//           pattern: [/@tms=(.*)/],
//           type: "tms",
//           urlTemplate: "https://example.com/tasks/%s",
//         },
//       ],
//     },
//     paths: [
//       './src/features/**/*.feature',  // Ensure this matches your actual feature file paths
//     ],
//     dryRun: false,
//     publishQuiet: true,
//     require: [
//       './src/step-definitions/**/*.js',  // Ensure this matches your actual step definition paths
//       './src/support/hooks.js',
//     ],
//     format: "./src/support/allure-reporter.js",  // Ensure this file exists and is correctly implemented
//     parallel: 1,
//   }
// };
