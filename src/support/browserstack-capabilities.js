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

  // Configuration for Firefox on macOS Ventura
  {
    browser: 'firefox',
    browser_version: 'latest',
    os: 'OS X',
    os_version: 'Ventura',
    name: 'Firefox on macOS Ventura',
    build: 'playwright cucumber js - Firefox Ventura',
    resolution: '1920x1080',
    'browserstack.networkLogs': true,
    'browserstack.console': 'verbose',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.geoLocation': 'US',
    'browserstack.timezone': 'America/Los_Angeles',
    project: 'Playwright-Cucumber Project',
    'browserstack.customUserData': {
      environment: 'staging',
      module: 'user-auth',
      feature: 'registration',
    },
  },

  // Configuration for Edge on Windows 10
  {
    browser: 'edge',
    browser_version: 'latest',
    os: 'Windows',
    os_version: '10',
    name: 'Edge on Windows 10',
    build: 'playwright cucumber js - Edge Win10',
    resolution: '1920x1080',
    'browserstack.networkLogs': true,
    'browserstack.console': 'verbose',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.geoLocation': 'GB',
    'browserstack.timezone': 'Europe/London',
    project: 'Playwright-Cucumber Project',
    'browserstack.customUserData': {
      environment: 'staging',
      module: 'checkout',
      feature: 'payment',
    },
  },

  // Configuration for Safari on macOS Big Sur
  {
    browser: 'safari',
    browser_version: 'latest',
    os: 'OS X',
    os_version: 'Big Sur',
    name: 'Safari on macOS Big Sur',
    build: 'playwright cucumber js - Safari Big Sur',
    resolution: '1920x1080',
    'browserstack.networkLogs': true,
    'browserstack.console': 'verbose',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.geoLocation': 'IN',
    'browserstack.timezone': 'Asia/Kolkata',
    project: 'Playwright-Cucumber Project',
    'browserstack.customUserData': {
      environment: 'staging',
      module: 'orders',
      feature: 'order-history',
    },
  },
];

module.exports = capabilities;
