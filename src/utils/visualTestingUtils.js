// src/utils/visualTestingUtils.js

const backstop = require('backstopjs');
const backstopConfig = require('../../backstop.json');

async function runVisualTesting(page, scenario) {
  backstopConfig.scenarios = [
    {
      label: scenario.pickle.name,
      url: page.url(),
      delay: 500,
      selectors: ['document'],
    },
  ];

  const testResult = await backstop('test', { config: backstopConfig });

  if (testResult.report !== 'pass') {
    throw new Error('Visual regression test failed');
  }
}

module.exports = { runVisualTesting };
