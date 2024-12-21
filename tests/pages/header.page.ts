import {Page} from "@playwright/test";
import {BasePage} from "./base.page";

export const selectors = {
    loginButtonInHeader: '#login2',
    headerElements: '.nav-item a'
};

export class HeaderPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async waitForLoginMenu() {
        await this.page.waitForSelector(selectors.loginButtonInHeader);
    }

    async openHomePage(url) {
        await this.page.goto(url);
    }

    async clickLoginMenuInHeader() {
        await this.page.click(selectors.loginButtonInHeader);
    }

    async clickHomeMenu() {
        await this.page.locator(selectors.headerElements).nth(0).click();
    }

    async clickCartMenu() {
        await this.page.locator(selectors.headerElements).nth(3).click();
    }

    async goToCart() {
        await this.clickCartMenu();
        await this.waitForLoginMenu();
    }

    async goToHome() {
        await this.clickHomeMenu();
        await this.waitForLoginMenu();
    }

}

