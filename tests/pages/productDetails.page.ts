import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {Product} from "../util/product";

export const selectors = {
    image: '#imgp img',
    name: '#tbodyid h2.name',
    price: '#tbodyid .price-container',
    description: '#more-information p',
    addToCartButton: '#tbodyid .btn-success',
};

export class ProductDetailsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async verifyAllElements() {
        expect(await this.getText(selectors.name)).not.toBe("");
        expect(this.getText(selectors.price)).not.toBe("");
        expect(this.getText(selectors.description)).not.toBe("");
        await this.verifyImageSrc(selectors.image);
        await this.page.waitForSelector(selectors.addToCartButton);
    }


    async clickAddToCartButton() {
        await this.page.click(selectors.addToCartButton);
    }

    async getProductDetails(quantity: number) {
        const name = await this.getText(selectors.name);
        const priceText = await this.getText(selectors.price);
        const price = parseFloat(priceText.match(/[\d.]+/)[0]);
        const src = await this.page.getAttribute(selectors.image, 'src');
        return new Product(name, price, src, quantity);
    }
}

