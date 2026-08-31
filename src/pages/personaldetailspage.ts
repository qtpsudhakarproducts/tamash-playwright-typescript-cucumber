import type { Page } from "playwright";
import { BasePage } from "./basepage";

export class PersonalDetailsPage extends BasePage {
    personalDetailsHeader;
    constructor(page: Page) {
        super(page);
        this.personalDetailsHeader = page.locator("//h6[text()='Personal Details']").describe("Personal Details Header");
    }
    async verifyPersonalDetailsPage() {
        // 30s, not 10s: this scenario's "Last Name" locator is deliberately broken to demo healing,
        // so it burns the full actionTimeout recovering before Save is even clicked. On the shared
        // OrangeHRM demo the post-Save navigation to this page can then take longer than 10s to
        // render, especially behind the slower AI providers.
        await this.personalDetailsHeader.waitFor({ state: 'visible', timeout: 30000 });
        console.log("Personal Details Page is displayed");
    }
}
