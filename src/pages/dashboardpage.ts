import type { Page } from "playwright";
import { BasePage } from "./basepage";

export class DashboardPage extends BasePage {
    dashboardHeader;
    lnkPIM;
    constructor(page: Page) {
        super(page);
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' }).describe("Dashboard Header");
        this.lnkPIM = page.getByRole('link', { name: 'PIM' }).describe("PIM Link");
    }

    async ClickPIM() {
        await this.lnkPIM.click();
        console.log("Clicked on PIM Link");
    }
    async verifyDashboardPage() {
        await this.dashboardHeader.waitFor({ state: 'visible', timeout: 10000 });
        console.log("Dashboard Page is displayed");
    }
}
