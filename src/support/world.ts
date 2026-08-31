import { setWorldConstructor, World as CucumberWorld, IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';
import { BasePage } from '../pages/basepage';
import { LoginPage } from '../pages/loginpage';
import { DashboardPage } from '../pages/dashboardpage';
import { PIMPage } from '../pages/pimpage';
import { AddEmployeePage } from '../pages/addemppage';
import { PersonalDetailsPage } from '../pages/personaldetailspage';

export class TamashWorld extends CucumberWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    newPage?: Page;

    basePage!: BasePage;
    loginPage!: LoginPage;
    dashboardPage!: DashboardPage;
    pimPage!: PIMPage;
    addEmpPage!: AddEmployeePage;
    personalDetailsPage!: PersonalDetailsPage;

    constructor(options: IWorldOptions) {
        super(options);
    }

    // Called once the healing-bound `page` is attached (see hooks.ts) so both POM and
    // non-POM step definitions can use the same World instance.
    initPageObjects() {
        this.basePage = new BasePage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.pimPage = new PIMPage(this.page);
        this.addEmpPage = new AddEmployeePage(this.page);
        this.personalDetailsPage = new PersonalDetailsPage(this.page);
    }
}

setWorldConstructor(TamashWorld);
