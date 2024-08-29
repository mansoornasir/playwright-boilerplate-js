const fs = require('fs');

const backstopConfigPath = '';

function updateBackstopConfig(url) {
  const config = JSON.parse(fs.readFileSync(backstopConfigPath, 'utf8'));

  config.scenarios.forEach((scenario) => {
    scenario.url = url; // Update the URL with the dynamic value
  });

  fs.writeFileSync(backstopConfigPath, JSON.stringify(config, null, 2));
}

module.exports = { updateBackstopConfig };
