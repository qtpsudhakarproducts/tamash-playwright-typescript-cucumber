Feature: Popup / new tab healing

  Scenario: A broken locator on a page opened in a new tab still heals
    Given I open the OrangeHRM login page
    When I click the footer link that opens a new tab
    Then a broken locator on the new tab should still heal
