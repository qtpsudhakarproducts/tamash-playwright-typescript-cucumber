Feature: Create employee using Page Object Model

  Scenario: Add a new employee through the PIM module
    Given I am logged in to OrangeHRM
    When I navigate to the PIM module and click Add
    And I add an employee with first name "John" and last name "Smith"
    Then the Personal Details page should be displayed
