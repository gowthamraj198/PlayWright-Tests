import {expect} from "@playwright/test";

export class Product {
    constructor(
        public name: string,
        public price: number,
        public src: string,
        public quantity: number,
    ) {}
}

export function calculateTotalPrice(products: Product[]): number {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
}


/**
 * Validates that the details of the products in the cart match the expected product details.
 *
 * This function iterates through the list of products in the cart and checks if each product
 * has a corresponding product in the expected product details list. It verifies that the name,
 * price, quantity, and image source of each product match the expected values.
 *
 * @param {Product[]} productDetails - The list of expected product details.
 * @param {Product[]} products - The list of products in the cart to validate.
 */

export async function validate2ProductsList(productDetails: Product[], products: Product[]) {
    products.forEach(product => {
        const matchingProduct = productDetails.find(p => p.name === product.name);
        expect(matchingProduct).toBeDefined();
        expect(matchingProduct.price).toBe(product.price);
        expect(matchingProduct.quantity).toBe(product.quantity);
        expect(matchingProduct.src).toBe(product.src);
    });
}