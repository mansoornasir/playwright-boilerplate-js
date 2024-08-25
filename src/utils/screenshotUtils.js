// src/utils/screenshotUtils.js

const fs = require('fs');

async function captureAndAttachScreenshot(page, scenario, screenshotsDir) {
  try {
    const screenshotPath = screenshotsDir + `${scenario.pickle.name}-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath });
    return fs.readFileSync(screenshotPath);
  } catch (error) {
    console.error('Failed to capture and attach screenshot:', error);
    return null;
  }
}

async function saveScreenShot(page, scenario, screenshotsDir) {
  try {
    const screenshotPath = screenshotsDir + `${scenario.pickle.name}-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath });
    return await screenshotPath.replace(/\//g, '\\');
  } catch (error) {
    console.error('Failed to capture and attach screenshot:', error);
    return null;
  }
}

module.exports = {
  captureAndAttachScreenshot,
  saveScreenShot,
};
