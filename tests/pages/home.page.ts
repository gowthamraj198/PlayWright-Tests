import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export const selectors = {
    products: '.card-title a',
};

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async clickProduct(productsNumber: number) {
        const product = this.page.locator(selectors.products).nth(productsNumber - 1);
        await product.click();
    }

}

