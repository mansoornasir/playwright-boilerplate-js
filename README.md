INSTALL THIS EXTENSION
Cucumber (Gherkin) Full Support

remove any other including "Cucumber.io"

use: npm install or npm install --legacy-peer-deps -> to install dependencies.

use: npm test -> to run the tests

use: npm run allure:generate -> to generate report

use: npm run allure:open -> to open the report

# Cucumber Steps Documentation

## Navigation

### Given

- **`I navigate to {string}`**
  - _Navigates to the specified URL using locators._

### When

- **`I navigate back`**

  - _Navigates back to the previous page._

- **`I navigate forward`**

  - _Navigates forward to the next page._

- **`I refresh the page`**
  - _Refreshes the current page._

## Element Interactions

### When

- **`I click on the {string}`**

  - _Clicks on the specified element using locators._

- **`I double-click on the {string}`**

  - _Double-clicks on the specified element using locators._

- **`I right-click on the {string}`**

  - _Right-clicks on the specified element using locators._

- **`I check the {string} checkbox`**

  - _Checks the specified checkbox using locators._

- **`I uncheck the {string} checkbox`**

  - _Unchecks the specified checkbox using locators._

- **`I type {string} into the {string} field`**

  - _Fills the specified form field with the given value using locators._

- **`I clear the {string} field`**

  - _Clears the specified input field using locators._

- **`I fill the form with the following data:`**

  - _Fills the form fields with data from the provided table._

- **`I select {string} from the {string} dropdown`**

  - _Selects the specified option from the dropdown using locators._

- **`I hover over the {string}`**

  - _Hovers over the specified element using locators._

- **`I scroll to the {string}`**
  - _Scrolls to the specified element using locators._

## Assertions

### Then

- **`I should see the {string} element`**

  - _Asserts that the specified element is visible using locators._

- **`The {string} should not be visible`**

  - _Asserts that the specified element is not visible using locators._

- **`The {string} should be enabled`**

  - _Asserts that the specified element is enabled using locators._

- **`The {string} should be disabled`**

  - _Asserts that the specified element is disabled using locators._

- **`The {string} field should be empty`**

  - _Asserts that the specified field is empty using locators._

- **`The {string} attribute of the {string} should be {string}`**

  - _Asserts that the specified attribute of the element has the expected value._

- **`I should see the text {string} on the page`**

  - _Asserts that the specified text is present on the page._

- **`I should not see the text {string} on the page`**

  - _Asserts that the specified text is not present on the page._

- **`The page title should be {string}`**

  - _Asserts that the page title matches the expected title._

- **`The element {string} should contain the text {string}`**

  - _Asserts that the specified element contains the expected text using locators._

- **`The URL should contain {string}`**

  - _Asserts that the current URL contains the expected text._

- **`The {string} checkbox should be checked`**
  - _Asserts that the specified checkbox is checked using locators._

## Keyboard Interactions

### When

- **`I press the enter key on element {string}`**

  - _Presses the Enter key on the specified element using locators._

- **`I press the escape key`**
  - _Presses the escape key on the keyboard._

## Waiting

### When

- **`I wait for {int} seconds`**

  - _Waits for the specified duration (in seconds)._

- **`I wait for {int} {string} elements to be present`**

  - _Waits for a specific number of elements to be present on the page._

- **`I wait for the {string} attribute of the {string} to be {string}`**

  - _Waits for the specified attribute of the element to have a specific value._

- **`I wait for the {string} to contain the text {string}`**

  - _Waits for the specified element to contain the expected text._

- **`I wait for the {string} to be visible`**

  - _Waits for the specified element to be visible using locators._

- **`I wait for the {string} to disappear`**
  - _Waits for the specified element to disappear using locators._

## Utility

### Then

- **`I take a screenshot`**

  - _Takes a screenshot of the current page._

- **`I take a full-page screenshot`**
  - _Takes a full-page screenshot of the current page._

### When

- **`I switch to the new tab`**
  - _Switches to a new tab that was opened._

## Authentication

### Given

- **`I am authenticated with username {string} and password {string}`**
  - _Authenticates with basic HTTP credentials._

## Files

### When

- **`I upload the file {string} to the {string} input`**
  - _Uploads a file to the specified input element using locators._

## Modal and Popup Handling

### When

- **`I accept the alert`**

  - _Handles and accepts an alert._

- **`I accept the confirmation`**

  - _Handles and accepts a confirmation dialog._

- **`I dismiss the confirmation`**

  - _Handles and dismisses a confirmation dialog._

- **`I accept the prompt with {string}`**

  - _Handles and accepts a prompt with the specified input._

- **`I dismiss the prompt`**
  - _Handles and dismisses a prompt._

## Advanced Steps

### When

- **`I switch to the iframe {string}`**

  - _Switches to the specified iframe._

- **`I switch back to the main content`**
  - _Switches back to the main content from an iframe._
