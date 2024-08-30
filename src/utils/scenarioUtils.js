// utils/scenarioUtils.js

function scenarioHasTag(scenario, tags) {
  return scenario.pickle.tags.some((tag) => tags.includes(tag.name));
}

function getCaseIdAndStatus(scenario) {
  const caseTag = scenario.pickle.tags.find((tag) => tag.name.startsWith('@C'));
  const caseId = caseTag ? caseTag.name.slice(1) : null;
  const status = scenario.result.status === 'FAILED' ? 'Failed' : 'Passed';
  return { caseId, status };
}

function shouldRunVisualTesting(scenario) {
  const { CONFIG } = require('./configUtils');
  return CONFIG.USE_VISUAL_TESTING && scenarioHasTag(scenario, ['@visual']);
}

module.exports = {
  scenarioHasTag,
  getCaseIdAndStatus,
  shouldRunVisualTesting,
};
