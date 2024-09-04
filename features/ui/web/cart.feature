@sevrity:critical @smoke @auth @browserstack @visual @accessibility
Feature: Cart Page
  As a user
  I want to be able to navigate to the home page
  So that I can access the main features of the website
  Background:
    Given I navigate to "home.url"

  @C003
  Scenario Outline: User add product to the cart
    And I wait for the "home.logo" to be visible
    And I type 'search.product' into the 'header.searchField' field
    And I press the enter key on element 'header.searchField'
    And I wait for the page to fully load
    And I click on the 'plp.shopNowBtn'
    And I wait for the page to fully load
    And I select '4.4-9.9 lbs 45 mg Yellow' from the 'pdp.weightAndColor' dropdown
    And I click on the 'pdp.addToCartBtn'
    And I wait for 8 seconds
    Then The count of elements 'cart.addedProducts' should be more than 0

  @C001
  Scenario Outline: User navigates to the cart page
    And I wait for the "home.logo" to be visible
    And I wait for the "header.cartIcon" to be visible
    And I click on the 'header.cartIcon'
    Then I wait for the 'cart.cartPageHeaderText' to be visible