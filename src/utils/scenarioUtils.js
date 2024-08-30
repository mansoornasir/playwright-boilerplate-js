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
function validateScenarioTag(scenario) {
  const requiredTagPattern = /^@C\d+$/;
  const scenarioTags = scenario.pickle.tags.map((tag) => tag.name);

  const hasValidTag = scenarioTags.some((tag) => requiredTagPattern.test(tag));

  if (!hasValidTag) {
    throw new Error(
      `Scenario "${scenario.pickle.name}" is missing a required tag that starts with @C followed by a number. Example: @C929`,
    );
  }
}

module.exports = {
  validateScenarioTag,
  scenarioHasTag,
  getCaseIdAndStatus,
  shouldRunVisualTesting,
};
