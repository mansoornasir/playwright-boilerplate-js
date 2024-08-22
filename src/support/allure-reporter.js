const AllureCucumberReporter = require('allure-cucumberjs/reporter');

class CustomAllureReporter {
  constructor(options) {
    // Set default options and merge with user-provided options
    const defaultOptions = {
      // outputDir: 'report/allure-results',
      // useRelativePaths: true,
      addCustomLabels: {
        Environment: 'Test',
      },
      addCustomCategories: [
        {
          name: 'Priority',
          value: 'High',
        },
      ],
    };

    this.options = { ...defaultOptions, ...options };
    this.allureReporter = new AllureCucumberReporter(this.options);
  }

  async before() {
    console.log('Before running tests');
  }

  async after() {
    console.log('After running tests');
  }

  handleTestCaseResult(event) {
    console.log('Handling test case result:', event);
    this.allureReporter.handleTestCaseResult(event);
  }

  handleTestStepResult(event) {
    console.log('Handling test step result:', event);
    this.allureReporter.handleTestStepResult(event);
  }

  async finished() {
    console.log('Test run finished');
    await this.allureReporter.finished();
  }
}

module.exports = CustomAllureReporter;
