import type { Page } from "playwright";

export class BasePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToURL(url: string) {
        await this.page.goto(url);
        console.log("Navigated to URL " + url);
    }
}
