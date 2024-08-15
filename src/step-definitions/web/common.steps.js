const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const locators = require('../../locators/locators');

// Navigation

// Example: Navigating to a URL
Given('I navigate to {string}', async function (url) {
  await this.page.goto(locators[url.split('.')[0]][url.split('.')[1]]);
});

// Example: Navigate back
When('I navigate back', async function () {
  await this.page.goBack();
});

// Example: Navigate forward
When('I navigate forward', async function () {
  await this.page.goForward();
});

// Example: Refresh page
When('I refresh the page', async function () {
  await this.page.reload();
});

// Element Interactions

// Example: Clicking an element
When('I click on the {string}', async function (selector) {
  await this.page.click(locators[selector.split('.')[0]][selector.split('.')[1]]);
});

// Example: Double-click an element
When('I double-click on the {string}', async function (selector) {
  await this.page.dblclick(locators[selector.split('.')[0]][selector.split('.')[1]]);
});

// Example: Right-click an element
When('I right-click on the {string}', async function (selector) {
  await this.page.click(locators[selector.split('.')[0]][selector.split('.')[1]], {
    button: 'right',
  });
});

// Example: Check a checkbox
When('I check the {string} checkbox', async function (selector) {
  await this.page.check(locators[selector.split('.')[0]][selector.split('.')[1]]);
});

// Example: Unchecking a checkbox
When('I uncheck the {string} checkbox', async function (selector) {
  await this.page.uncheck(locators[selector.split('.')[0]][selector.split('.')[1]]);
});

// Example: Check if a radio button is selected
Then('The {string} radio button should be selected', async function (selector) {
  const isChecked = await this.page.isChecked(
    locators[selector.split('.')[0]][selector.split('.')[1]],
  );
  expect(isChecked).toBeTruthy();
});

// Example: Filling a form field
When('I type {string} into the {string} field', async function (value, selector) {
  await this.page.fill(locators[selector.split('.')[0]][selector.split('.')[1]], value);
});

// Example: Clear an input field
When('I clear the {string} field', async function (selector) {
  await this.page.fill(locators[selector.split('.')[0]][selector.split('.')[1]], '');
});

// Example: Fill a form with data from a table (not tested)
When('I fill the form with the following data:', async function (dataTable) {
  for (const [selector, value] of dataTable.rows()) {
    await this.page.fill(selector, value);
  }
});

// Example: Select an option from a dropdown
When('I select {string} from the {string} dropdown', async function (option, selector) {
  await this.page.selectOption(locators[selector.split('.')[0]][selector.split('.')[1]], option);
});

// Example: Hover over an element
When('I hover over the {string}', async function (selector) {
  await this.page.hover(locators[selector.split('.')[0]][selector.split('.')[1]]);
});

// Example: Scroll to an element
When('I scroll to the {string}', async function (selector) {
  await this.page
    .locator(locators[selector.split('.')[0]][selector.split('.')[1]])
    .scrollIntoViewIfNeeded();
});

// Assertions

// Example: Verifying an element's visibility
Then('I should see the {string} element', async function (selector) {
  expect(
    await this.page.isVisible(locators[selector.split('.')[0]][selector.split('.')[1]]),
  ).toBeTruthy();
});

// Example: Verifying an element's visibility
Then('the {string} should not be visible', async function (selector) {
  const isVisible = await this.page.isVisible(
    locators[selector.split('.')[0]][selector.split('.')[1]],
  );
  expect(isVisible).toBeFalsy();
});

// Example: Check if an element is enabled
Then('the {string} should be enabled', async function (selector) {
  const isEnabled = await this.page.isEnabled(
    locators[selector.split('.')[0]][selector.split('.')[1]],
  );
  expect(isEnabled).toBeTruthy();
});

// Example: Check if an element is disabled
Then('the {string} should be disabled', async function (selector) {
  const isEnabled = await this.page.isEnabled(
    locators[selector.split('.')[0]][selector.split('.')[1]],
  );
  expect(isEnabled).toBeFalsy();
});

// Example: Check if the field is empty
Then('the {string} field should be empty', async function (selector) {
  const value = await this.page.inputValue(
    locators[selector.split('.')[0]][selector.split('.')[1]],
  );
  expect(value).toBe('');
});

// Example: Check if an element's attribute has a specific value
Then(
  'the {string} attribute of the {string} should be {string}',
  async function (attribute, selector, expectedValue) {
    const actualValue = await this.page.getAttribute(
      locators[selector.split('.')[0]][selector.split('.')[1]],
      attribute,
    );
    expect(actualValue).toBe(expectedValue);
  },
);

// Example: Verifying text content on the page
Then('I should see the text {string} on the page', async function (text) {
  expect(await this.page.textContent('body')).toContain(text);
});

// Example: Verify text does not appear on the page
Then('I should not see the text {string} on the page', async function (text) {
  const content = await this.page.textContent('body');
  expect(content).not.toContain(text);
});

// Example: Asserting page title
Then('The page title should be {string}', async function (title) {
  expect(await this.page.title()).toBe(title);
});

// Example: Check if an element contains specific text
Then('The element {string} should contain the text {string}', async function (selector, text) {
  const elementText = await this.page.textContent(
    locators[selector.split('.')[0]][selector.split('.')[1]],
  );
  expect(elementText).toContain(text);
});

// Example: Check if a URL contains specific text
Then('The URL should contain {string}', async function (expectedUrlPart) {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain(expectedUrlPart);
});

// Example: Check if a URL contains specific text
Then('The {string} checkbox should be checked', async function (selector) {
  const isChecked = await this.page.isChecked(
    locators[selector.split('.')[0]][selector.split('.')[1]],
  );
  expect(isChecked).toBeTruthy();
});

// Keyboard Interactions

// Example: I press Enter key
When('I press the enter key on element {string}', async function (selector) {
  await this.page.press(locators[selector.split('.')[0]][selector.split('.')[1]], 'Enter');
});

// When I press Escape key
When('I press the escape key', async function () {
  const page = this.page; // Assuming 'page' is available in the context
  await page.keyboard.press('Escape');
});

// Waiting

// Example: Waiting for a specific duration
When('I wait for {int} seconds', async function (seconds) {
  await this.page.waitForTimeout(seconds * 1000);
});

// Example: Wait for a specific number of elements to be present (not tested)
When('I wait for {int} {string} elements to be present', async function (count, selector) {
  await this.page.waitForFunction(
    (selector, count) => document.querySelectorAll(selector).length === count,
    selector,
    count,
  );
});

// Example: Wait for an element’s attribute to have a specific value (not tested)
When(
  'I wait for the {string} attribute of the {string} to be {string}',
  async function (attribute, selector, value) {
    await this.page.waitForFunction(
      (selector, attribute, value) =>
        document.querySelector(selector).getAttribute(attribute) === value,
      selector,
      attribute,
      value,
    );
  },
);
// Example: Wait for an element to contain specific text
When('I wait for the {string} to contain the text {string}', async function (selector, text) {
  await this.page.waitForFunction(
    (selector, text) => document.querySelector(selector).innerText.includes(text),
    selector,
    text,
  );
});

// Example: Wait for an element to be visible
When('I wait for the {string} to be visible', async function (selector) {
  await this.page.waitForSelector(locators[selector.split('.')[0]][selector.split('.')[1]], {
    state: 'visible',
  });
});

// Example: Wait for a specific element to disappear
When('I wait for the {string} to disappear', async function (selector) {
  await this.page.waitForSelector(locators[selector.split('.')[0]][selector.split('.')[1]], {
    state: 'hidden',
  });
});

// Utility

// Example: Take a screenshot
Then('I take a screenshot', async function () {
  const screenshotPath = path.resolve(`../../screenshots/screenshot-${Date.now()}.png`);
  await this.page.screenshot({ path: screenshotPath });
});

// Example: Take a full-page screenshot
Then('I take a full-page screenshot', async function () {
  const screenshotPath = path.resolve(`screenshots/full-page-screenshot-${Date.now()}.png`);
  await this.page.screenshot({ path: screenshotPath, fullPage: true });
});

// some chagnes

// Example: Switch to a new tab (not tested yet)
// When("I switch to the new tab", async function (selector) {
//   const [newPage] = await Promise.all([
//     this.page.context().waitForEvent("page"),
//     this.page.click("selector-that-opens-new-tab"), // Replace with the actual selector
//   ]);
//   await newPage.waitForLoadState();
//   this.page = newPage;
// });

// Authentication

// Example: Basic HTTP authentication
Given(
  'I am authenticated with username {string} and password {string}',
  async function (username, password) {
    const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
    await this.page.setExtraHTTPHeaders({
      Authorization: `Basic ${base64Credentials}`,
    });
  },
);

// Files

// Example: Upload a file
When('I upload the file {string} to the {string} input', async function (filePath, selector) {
  await this.page.setInputFiles(locators[selector.split('.')[0]][selector.split('.')[1]], filePath);
});

// Modal and Popup Handling Steps

// Example: Handle an alert
When('I accept the alert', async function () {
  this.page.once('dialog', (dialog) => dialog.accept());
});

// Example: Handle a confirm box acceptance
When('I accept the confirmation', async function () {
  this.page.once('dialog', (dialog) => dialog.accept());
});

// Example: Handle a confirm box dismissal
When('I dismiss the confirmation', async function () {
  this.page.once('dialog', (dialog) => dialog.dismiss());
});

// Example: Handle a prompt box accept
When('I accept the prompt with {string}', async function (inputText) {
  this.page.once('dialog', (dialog) => dialog.accept(inputText));
});

// Example: Handle a prompt box dismiss
When('I dismiss the prompt', async function () {
  this.page.once('dialog', (dialog) => dialog.dismiss());
});

// Advanced steps

// Example: Switch to iframe
When('I switch to the iframe {string}', async function (selector) {
  const frame = await this.page.frame({ selector });
  this.page = frame;
});

// Example: Switch back to main frame
When('I switch back to the main content', async function () {
  this.page = this.page.mainFrame();
});
