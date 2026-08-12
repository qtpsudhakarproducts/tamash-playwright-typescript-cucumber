import type { Page } from "playwright";
import { BasePage } from "./basepage";

export class PersonalDetailsPage extends BasePage {
    personalDetailsHeader;
    constructor(page: Page) {
        super(page);
        this.personalDetailsHeader = page.locator("//h6[text()='Personal Details']").describe("Personal Details Header");
    }
    async verifyPersonalDetailsPage() {
        await this.personalDetailsHeader.waitFor({ state: 'visible', timeout: 10000 });
        console.log("Personal Details Page is displayed");
    }
}
