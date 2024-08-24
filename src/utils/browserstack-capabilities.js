const capabilities = [
  // Configuration for Chrome on Windows 11
  {
    browser: 'chrome',
    browser_version: 'latest',
    os: 'Windows',
    os_version: '11',
    name: 'Chrome on Windows 11',
    build: 'playwright cucumber js - Chrome Win11',
    resolution: '1920x1080',
    'browserstack.networkLogs': true,
    'browserstack.console': 'verbose',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.geoLocation': 'US',
    'browserstack.timezone': 'UTC',
    project: 'Playwright-Cucumber Project',
    'browserstack.customUserData': {
      environment: 'staging',
      module: 'user-auth',
      feature: 'login',
    },
  },
];

module.exports = capabilities;
