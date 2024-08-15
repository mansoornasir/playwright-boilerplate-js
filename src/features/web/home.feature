@only
Feature: Home Page Navigation
    As a user
    I want to be able to navigate to the home page
    So that I can access the main features of the website
Background:
    Given I navigate to "home.url"

Scenario Outline: User navigates to the home page
    When I click on the "home.loginBtn"