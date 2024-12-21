import {expect, Page} from "@playwright/test";
import {BasePage} from "./base.page";
import {Product} from "../util/product";

export const selectors = {
    image: '#tbodyid img',
    products: '#tbodyid tr',
    productDetails: '#tbodyid td',
    placeOrderButton: '.btn-success',
    total: '#totalp',
};

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async getTotalPrice() {
        await this.page.waitForSelector(selectors.total,  { timeout: 30000 });
        return this.getText(selectors.total);
    }

    async verifyPlaceOrderButton() {
        await this.page.waitForSelector(selectors.placeOrderButton,  { timeout: 30000 });

    }

    async verifyNumberOfProducts(expectedNumberOfProducts: number) {
        const products = await this.page.locator(selectors.products).count();
        await expect(products).toBe(expectedNumberOfProducts);
    }


    /**
     * Retrieves the product details from the cart page.
     *
     * This function iterates through the product details elements on the cart page,
     * extracts the image source, name, and price of each product, and constructs a list of `Product` objects.
     * If a product with the same name already exists in the list, it increments the quantity of that product.
     *
     * @returns {Promise<Product[]>} A promise that resolves to an array of `Product` objects.
     */

    async getProductDetails(): Promise<Product[]> {
        const productDetails = await this.page.$$(selectors.productDetails);
        const products: Product[] = [];

        for (let i = 0; i < productDetails.length; i += 4) {
            const imageElement = await productDetails[i].$('img');
            const image = await imageElement.getAttribute('src');
            const name = await productDetails[i + 1].innerText();
            const price = parseFloat(await productDetails[i + 2].innerText());

            const existingProduct = products.find(product => product.name === name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                products.push(new Product(name, price, image, 1));
            }
        }

        return products;
    }
}

