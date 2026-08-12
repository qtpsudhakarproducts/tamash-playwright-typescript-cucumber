import { Given, When, Then } from '@cucumber/cucumber';
import { TamashWorld } from '../../src/support/world';

// Page Object Model example: step definitions only call methods on page objects.

Given('I am logged in to OrangeHRM', async function (this: TamashWorld) {
    await this.basePage.navigateToURL('/');
    await this.loginPage.EnterUserName('testadmin');
    await this.loginPage.EnterPassword('Vibetestq@123#');
    await this.loginPage.ClickLogin();
    await this.dashboardPage.verifyDashboardPage();
});

When('I navigate to the PIM module and click Add', async function (this: TamashWorld) {
    await this.dashboardPage.ClickPIM();
    await this.pimPage.verifyPIMPage();
    await this.pimPage.ClickAdd();
});

When('I add an employee with first name {string} and last name {string}', async function (this: TamashWorld, firstName: string, lastName: string) {
    await this.addEmpPage.EnterFirstName(firstName);
    await this.addEmpPage.EnterLastName(lastName);
    await this.addEmpPage.ClickSave();
});

Then('the Personal Details page should be displayed', async function (this: TamashWorld) {
    await this.personalDetailsPage.verifyPersonalDetailsPage();
});
