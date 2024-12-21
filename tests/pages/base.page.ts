import {expect, Page} from "@playwright/test";

export class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async openHomePage(url) {
        await this.page.goto(url);
    }

    async getText(selector: string): Promise<string | null> {
        const element = await this.page.locator(selector);
        return await element.textContent();
    }

    async verifyImageSrc(selector: string) {
        const imageSrc = await this.page.getAttribute(selector, 'src');
        expect(imageSrc).not.toBeNull();
    }

}

