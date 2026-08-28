import { When, Then } from '@cucumber/cucumber';
import { TamashWorld } from '../../src/support/world';

// Non-POM example: a page opened in a new tab is just as healing-aware as the main page, with
// zero extra setup beyond bindContext() on the World's own context (see hooks.ts). Real target:
// the login page's own "OrangeHRM, Inc" footer link opens the real orangehrm.com marketing site
// in a new tab.

When('I click the footer link that opens a new tab', async function (this: TamashWorld) {
    const newPagePromise = this.context.waitForEvent('page');
    await this.page.getByRole('link', { name: 'OrangeHRM, Inc' }).describe('OrangeHRM, Inc footer link').click();
    this.newPage = await newPagePromise;

    // orangehrm.com runs a real cookie-consent banner that can cover the page -- dismiss it if
    // present, don't fail if it never shows up (already-set cookies, timing).
    await this.newPage.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click({ timeout: 5000 }).catch(() => {});
});

Then('a broken locator on the new tab should still heal', async function (this: TamashWorld) {
    if (!this.newPage) {
        throw new Error('No new tab was captured by the previous step.');
    }
    // Intentionally broken -- no such id exists on orangehrm.com's real homepage -- to demonstrate
    // a real self-heal on a page opened in a new tab.
    const txtHomepageEmail = this.newPage.locator('#doesNotExistEmailField').describe('Your Email Address Field (Homepage)');
    await txtHomepageEmail.fill('test@vibetestq.com');

    const value = await this.newPage.getByPlaceholder('Your email address').inputValue();
    if (value !== 'test@vibetestq.com') {
        throw new Error(`Expected the healed field to contain the filled value, got "${value}"`);
    }
});
