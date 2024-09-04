@sevrity:critical @smoke @auth @browserstack @visual @accessibility
Feature: Signin Page
  As a user
  I want to be able to navigate to the home page
  So that I can access the main features of the website
  Background:
    Given I navigate to "home.url"

  @C004
  Scenario Outline: User login with valid credentials
    And I wait for the "home.logo" to be visible
    And I navigate to 'signin.signinUrl'
    And I login with valid 'hhussain@allivet.com' and valid 'Admin@123'
    And I wait for 15 seconds
    Then The page title should be 'dashboard.pageTitle'

  @C005
  Scenario Outline: User logout from the site
    And I wait for the "home.logo" to be visible
    And I navigate to 'signin.signinUrl'
    And I login with valid 'hhussain@allivet.com' and valid 'Admin@123'
    And I wait for 15 seconds
    And I logout from the site
    And I wait for 10 seconds
    Then The element 'header.myAccountMenue' should contain the text 'Sign In'

  @C006
  Scenario Outline: User create an account
    And I wait for the "home.logo" to be visible
    And I navigate to 'signin.signinUrl'
    And I type 'customerRegForm.firstName' into the 'signin.firstName' field
    And I type 'customerRegForm.lastName' into the 'signin.lastName' field
    And I type 'customerRegForm.email' into the 'signin.regEmail' field
    And I type 'customerRegForm.password' into the 'signin.regPassword' field
    And I type 'customerRegForm.password' into the 'signin.confirmPassword' field
    And I click on the 'signin.regButton'
    And I wait for 10 seconds
    Then The page title should be 'dashboard.pageTitle'