import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export const selectors = {
    usernameLabel: '#logInModal label[for="log-name"]',
    passwordLabel: '//*[@id=\'loginpassword\']/../label',

    username: '#loginusername',
    password: '#loginpassword',
    user: '#nameofuser',
    loginButtonInModal: '#logInModal .btn-primary',
    closeButtonInModal: '#logInModal .btn-secondary',

    cancelButtonInModal: '#logInModal button[data-dismiss="modal"].close',
};

export class LoginModal extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async enterUsername(username: string) {
        await this.page.fill(selectors.username, username);
    }

    async verifyAllElements() {
        expect(this.getText(selectors.usernameLabel)).not.toBe("");
        expect(this.getText(selectors.passwordLabel)).not.toBe("");
        await this.page.waitForSelector(selectors.username);
        await this.page.waitForSelector(selectors.password);
        await this.page.waitForSelector(selectors.loginButtonInModal);
        await this.page.waitForSelector(selectors.closeButtonInModal);
        await this.page.waitForSelector(selectors.cancelButtonInModal);
    }

    async enterPassword(password: string) {
        await this.page.fill(selectors.password, password);
    }

    async clickLoginButtonInModal() {
        await this.page.click(selectors.loginButtonInModal);
    }

    async clickCloseButtonInModal() {
        await this.page.click(selectors.closeButtonInModal);
    }

    async clickCancelButtonInModal() {
        await this.page.click(selectors.cancelButtonInModal);
    }

    async verifyUser(user: string) {
        await this.page.waitForSelector(selectors.user);
        const userElement = await this.page.locator(selectors.user);
        const userText = await userElement.textContent();
        expect(userText).toContain(user);
    }

    async verifyLoginModalDisappear() {
        await this.page.waitForSelector('#logInModal', { state: 'hidden' });
    }
}

