// utils/accessibilityUtils.js
const { AxeBuilder } = require('@axe-core/playwright');
const { createHtmlReport } = require('axe-html-reporter');
const fs = require('fs');

async function runAccessibilityTests(page, scenario) {
  console.warn('Running accessibility tests');

  // Run the accessibility checks using AxeBuilder
  const results = await new AxeBuilder({ page }).analyze();

  // Define the path for the accessibility report
  const a11yReportPath =
    process.cwd() + `\\reports\\a11y-reports\\${scenario.pickle.name.replace(/\s+/g, '_')}.html`;

  // Create HTML report
  const reportHTML = createHtmlReport({
    results,
    options: {
      outputDir: `../../reports/a11y-reports/${scenario.pickle.name.replace(/\s+/g, '_')}.html`,
    },
  });
  fs.writeFileSync(a11yReportPath, reportHTML);

  // If there are violations, log them and mark the scenario as failed
  if (results.violations.length > 0) {
    console.error(`Accessibility issues found: ${results.violations.length}`);
    console.error(`Axe HTML report generated: ${a11yReportPath}`);
    throw new Error(
      `Accessibility violations detected. See the report for details: ${a11yReportPath}`,
    );
  }
}

module.exports = {
  runAccessibilityTests,
};
