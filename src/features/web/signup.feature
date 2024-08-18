@only @smoke
Feature:Login Functionality
  As a user
  I want to be able to navigate to the home page
  So that I can access the main features of the website
  Background:
    Given I navigate to "signup.url"
    And The URL should contain "/signin"

  Scenario Outline: User can Signup with valid credentials
    When I wait for the "signup.firstNameField" to be visible
    And I fill the form with the following data:
      | field                      | value            |
      | signup.firstNameField      | signup.firstName |
      | signup.lastNameField       | signup.lastName  |
      | signup.emailAddressField   | signup.email     |
      | signup.passwordField       | signup.password  |
      | signup.repeatPasswordField | signup.password  |
    And I click on the "signup.createAccountBtn"
    And I wait for 3 seconds
    Then I should see the text "Overview" on the page
    And The URL should contain "/account?registration=submitted"


  Scenario Outline: User can't Signup with duplication Email address
    When I wait for the "signup.firstNameField" to be visible
    And I fill the form with the following data:
      | field                      | value                 |
      | signup.firstNameField      | signup.firstName      |
      | signup.lastNameField       | signup.lastName       |
      | signup.emailAddressField   | signup.duplicateEmail |
      | signup.passwordField       | signup.password       |
      | signup.repeatPasswordField | signup.password       |
    And I click on the "signup.createAccountBtn"
    And I wait for 4 seconds
    Then The URL should contain "/signin"