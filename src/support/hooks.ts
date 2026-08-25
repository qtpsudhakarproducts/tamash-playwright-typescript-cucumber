import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { bindPageActions } from 'tamash-playwright';
import { TamashWorld } from './world';

// Cucumber's 5s default step timeout doesn't leave room for a real page navigation plus,
// when a selector breaks, the self-healer's ARIA snapshot + AI provider round trip.
setDefaultTimeout(60 * 1000);

Before(async function (this: TamashWorld) {
    // headless: false is nice locally (watch the browser), but a CI runner has no display and
    // would fail outright trying to launch a headed browser — CI=true is set automatically by
    // GitHub Actions (and most other CI systems), so this only needs to be explicit here, not
    // configured per-workflow.
    this.browser = await chromium.launch({ headless: !!process.env.CI });
    this.context = await this.browser.newContext({ baseURL: process.env.APP_BASE_URL });
    // Wrap the raw Playwright page so every action call heals itself on a broken selector,
    // exactly like the `page` fixture tamash-playwright injects for @playwright/test.
    this.page = bindPageActions(await this.context.newPage());
    this.initPageObjects();
});

After(async function (this: TamashWorld) {
    await this.context?.close();
    await this.browser?.close();
});
