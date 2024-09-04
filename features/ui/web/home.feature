@sevrity:critical @smoke @auth @browserstack @visual @accessibility
Feature: Home Page 
    As a user
    I want to be able to navigate to the home page
    So that I can access the main features of the website
    Background:
        Given I navigate to "home.url"


    
    @C002
    Scenario Outline: User search for any product
        And I wait for the "home.logo" to be visible
        And I type 'search.term' into the 'header.searchField' field
        Then The count of elements 'plp.productTitleImage' should be more than 0



        #Then The element 'dashboard.welcomeText' should contain the text 'dashboard.text'



        # And I visually compare "visual.homeUrl" to "visual.homeReferenceUrl"

# And I type "search.term" into the "home.searchField" field
# And I press the enter key on element "home.searchField"
# And I wait for 5 seconds
# Then The count of elements "search.productImage" should be more than 0

# @C004
# Scenario Outline: User search for any product
#     And I login with valid http credentials
#     And I wait for the "home.logo" to be visible


#     # And I click on the 'header.searchField'
#     # And I type 'search.term' into the 'header.searchField' field
#     # And I press the enter key on element 'header.searchField'
#     # And I wait for the page to fully load
#     Then The count of elements 'plp.productTitleImage' should be more than 0
