use: npm install -> to install dependencies.

use: npm test -> to run the tests

use: npm run allure:generate -> to generate report

use: npm run allure:open -> to open the report


# Cucumber Steps Documentation

## Navigation

### Given

- **`I navigate to {string}`**
  - *Navigates to the specified URL using locators.*

### When

- **`I navigate back`**
  - *Navigates back to the previous page.*

- **`I navigate forward`**
  - *Navigates forward to the next page.*

- **`I refresh the page`**
  - *Refreshes the current page.*

## Element Interactions

### When

- **`I click on the {string}`**
  - *Clicks on the specified element using locators.*

- **`I double-click on the {string}`**
  - *Double-clicks on the specified element using locators.*

- **`I right-click on the {string}`**
  - *Right-clicks on the specified element using locators.*

- **`I check the {string} checkbox`**
  - *Checks the specified checkbox using locators.*

- **`I uncheck the {string} checkbox`**
  - *Unchecks the specified checkbox using locators.*

- **`I type {string} into the {string} field`**
  - *Fills the specified form field with the given value using locators.*

- **`I clear the {string} field`**
  - *Clears the specified input field using locators.*

- **`I fill the form with the following data:`**
  - *Fills the form fields with data from the provided table.*

- **`I select {string} from the {string} dropdown`**
  - *Selects the specified option from the dropdown using locators.*

- **`I hover over the {string}`**
  - *Hovers over the specified element using locators.*

- **`I scroll to the {string}`**
  - *Scrolls to the specified element using locators.*

## Assertions

### Then

- **`I should see the {string} element`**
  - *Asserts that the specified element is visible using locators.*

- **`The {string} should not be visible`**
  - *Asserts that the specified element is not visible using locators.*

- **`The {string} should be enabled`**
  - *Asserts that the specified element is enabled using locators.*

- **`The {string} should be disabled`**
  - *Asserts that the specified element is disabled using locators.*

- **`The {string} field should be empty`**
  - *Asserts that the specified field is empty using locators.*

- **`The {string} attribute of the {string} should be {string}`**
  - *Asserts that the specified attribute of the element has the expected value.*

- **`I should see the text {string} on the page`**
  - *Asserts that the specified text is present on the page.*

- **`I should not see the text {string} on the page`**
  - *Asserts that the specified text is not present on the page.*

- **`The page title should be {string}`**
  - *Asserts that the page title matches the expected title.*

- **`The element {string} should contain the text {string}`**
  - *Asserts that the specified element contains the expected text using locators.*

- **`The URL should contain {string}`**
  - *Asserts that the current URL contains the expected text.*

- **`The {string} checkbox should be checked`**
  - *Asserts that the specified checkbox is checked using locators.*

## Keyboard Interactions

### When

- **`I press the enter key on element {string}`**
  - *Presses the Enter key on the specified element using locators.*

## Waiting

### When

- **`I wait for {int} seconds`**
  - *Waits for the specified duration (in seconds).*

- **`I wait for {int} {string} elements to be present`**
  - *Waits for a specific number of elements to be present on the page.*

- **`I wait for the {string} attribute of the {string} to be {string}`**
  - *Waits for the specified attribute of the element to have a specific value.*

- **`I wait for the {string} to contain the text {string}`**
  - *Waits for the specified element to contain the expected text.*

- **`I wait for the {string} to be visible`**
  - *Waits for the specified element to be visible using locators.*

- **`I wait for the {string} to disappear`**
  - *Waits for the specified element to disappear using locators.*

## Utility

### Then

- **`I take a screenshot`**
  - *Takes a screenshot of the current page.*

- **`I take a full-page screenshot`**
  - *Takes a full-page screenshot of the current page.*

### When

- **`I switch to the new tab`**
  - *Switches to a new tab that was opened.*

## Authentication

### Given

- **`I am authenticated with username {string} and password {string}`**
  - *Authenticates with basic HTTP credentials.*

## Files

### When

- **`I upload the file {string} to the {string} input`**
  - *Uploads a file to the specified input element using locators.*

## Modal and Popup Handling

### When

- **`I accept the alert`**
  - *Handles and accepts an alert.*

- **`I accept the confirmation`**
  - *Handles and accepts a confirmation dialog.*

- **`I dismiss the confirmation`**
  - *Handles and dismisses a confirmation dialog.*

- **`I accept the prompt with {string}`**
  - *Handles and accepts a prompt with the specified input.*

- **`I dismiss the prompt`**
  - *Handles and dismisses a prompt.*

## Advanced Steps

### When

- **`I switch to the iframe {string}`**
  - *Switches to the specified iframe.*

- **`I switch back to the main content`**
  - *Switches back to the main content from an iframe.*
