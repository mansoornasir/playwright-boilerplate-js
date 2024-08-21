@only @smoke
Feature: Home Page Navigation
    As a user
    I want to be able to navigate to the home page
    So that I can access the main features of the website
    Background:
        Given I login with valid http credentials

    Scenario Outline: User navigates to the home page
        And I wait for the "home.logo" to be visible
        And I type "search.term" into the "home.searchField" field
        And I press the enter key on element "home.searchField"
        And I wait for 10 seconds
        Then The count of elements "search.productImage" should be more than 1