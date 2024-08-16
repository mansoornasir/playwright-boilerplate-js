@only @smoke
Feature:Login Functionality
    As a user
    I want to be able to navigate to the home page
    So that I can access the main features of the website
    Background:
        Given I navigate to "login.url"
        And The URL should contain "/signin"

    Scenario Outline: User login with valid credentials
        When I wait for the "login.emailField" to be visible
        And I type "<email>" into the "login.emailField" field
        And I wait for the "login.passwordField" to be visible
        And I type "<password>" into the "login.passwordField" field
        And I click on the "login.loginBtn"
        Then I should see the text "Overview" on the page
        
    Examples: 
    | email                    | password  |
    | 1mansoor.nasir@gmail.com | Admin@123 |