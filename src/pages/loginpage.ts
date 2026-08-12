import type { Page } from "playwright";
import { BasePage } from "./basepage";

export class LoginPage extends BasePage {
    txtUserName;
    txtPassword;
    btnLogin;
    constructor(page: Page) {
        super(page);
        // Intentionally broken placeholder ("Username1") to demonstrate self-healing recovery.
        this.txtUserName = page.getByPlaceholder("Username1").describe("Username Textbox");
        this.txtPassword = page.getByPlaceholder("Password").describe("Password Textbox");
        this.btnLogin = page.getByRole('button', { name: 'Login' }).describe("Login Button");
    }

    async EnterUserName(username: string) {
        await this.txtUserName.fill(username);
        console.log("Entered username " + username);
    }
    async EnterPassword(password: string) {
        await this.txtPassword.fill(password);
        console.log("Entered password " + password);
    }
    async ClickLogin() {
        await this.btnLogin.click();
        console.log("Clicked on Login Button");
    }
}
