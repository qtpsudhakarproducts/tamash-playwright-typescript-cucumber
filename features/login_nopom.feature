Feature: Login without Page Object Model

  Scenario: Login using CSS selectors declared directly in the step definitions
    Given I open the OrangeHRM login page
    When I fill in username "testadmin" and password "Vibetestq@123#" using CSS selectors
    And I click the login button using a CSS selector
    Then the Dashboard heading should be visible
