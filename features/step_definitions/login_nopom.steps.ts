import { Given, When, Then } from '@cucumber/cucumber';
import { TamashWorld } from '../../src/support/world';

// Non-POM example: locators are declared directly inside the step definitions.

Given('I open the OrangeHRM login page', async function (this: TamashWorld) {
    await this.page.goto('/');
});

When('I fill in username {string} and password {string} using CSS selectors', async function (this: TamashWorld, username: string, password: string) {
    // Intentionally broken selector ("username1") to demonstrate self-healing recovery.
    const txtUserName = this.page.locator('input[name="username1"]').describe('Username Textbox');
    await txtUserName.fill(username);

    const txtPassword = this.page.locator("input[placeholder='Password']").describe('Password Textbox');
    await txtPassword.fill(password);
});

When('I click the login button using a CSS selector', async function (this: TamashWorld) {
    const btnLogin = this.page.locator("button[type='submit']").describe('Login Button');
    await btnLogin.click();
});

Then('the Dashboard heading should be visible', async function (this: TamashWorld) {
    await this.page.locator('h6').waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.page.locator('h6').innerText();
    if (text !== 'Dashboard') {
        throw new Error(`Expected Dashboard heading, got "${text}"`);
    }
});
