import {test} from './baseTest';
import {ProductDetailsPage} from "../pages/productDetails.page";
import {HomePage} from "../pages/home.page";
import {expect, Page} from "@playwright/test";
import {CartPage} from "../pages/cart.page";
import {calculateTotalPrice, Product, validate2ProductsList} from "../util/product";
import {handleDialog, handleDialogWithWait} from "../util/dialogHandler";
import {messages} from "../test-data/validationText";


/*
    assumptions:
        1. no need to sign in to add items to cart
        2. all items have unlimited quantity
        3. deleting items from cart is not in scope
        4. placing order is not in scope
        5. testing all elements like table heading, page title on product details page and cart page are ignored due to time constraints
 */
test.describe('Add to cart', () => {

    let productDetailsPage: ProductDetailsPage;
    let cartPage: CartPage;
    const products = [];

    test.beforeEach(async ({ page, homePage }) => {
        productDetailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);
    });

    test('should have all elements', async ({homePage}) => {
        await homePage.clickProduct(1)
        await productDetailsPage.verifyAllElements();
    });

    /*
         * This test case verifies that the user can add the first and second products to the cart,
         * and that the correct details and quantities are reflected in the cart.
         *
         * Steps:
         * 1. Add the first product to the cart with a quantity of 1.
         * 2. Navigate back to the home page.
         * 3. Add the second product to the cart with a quantity of 2.
         * 4. Navigate to the cart page.
         * 5. Calculate the total price of the products added to the cart and verify it matches the total price displayed in the cart.
         * 6. Verify that the number of products in the cart is 3 (1 of the first product and 2 of the second product).
         * 7. Retrieve the product details from the cart and verify that they match the details of the products added.
     */

    test('should allow to add 1st and 2nd element and verify same details, quantity are added to the cart', async ({homePage, headerPage, page}) => {

        const product1 = await getProductDetailsAndAddToCart(1,1, homePage, productDetailsPage, page);
        products.push(product1);

        await headerPage.goToHome();

        // 2nd product we add twice
        const product2 = await getProductDetailsAndAddToCart(2,2, homePage, productDetailsPage, page);
        products.push(product2);

        await headerPage.goToCart();

        const totalPrice = calculateTotalPrice(products);
        expect(totalPrice).toBe(parseFloat(await cartPage.getTotalPrice()));

        await cartPage.verifyNumberOfProducts(3);
        const productDetails = await cartPage.getProductDetails()

        expect(productDetails.length).toBe(products.length);

        await validate2ProductsList(productDetails, products);

    });

    test.skip('should not permit users to add items beyond the limit', async ({}) => {

        // not sure what is the cart size limit
    });

    test.skip('should be able to remove items from the card', async ({}) => {

        // not related to add items to cart functionality
    });

    test.skip('should not allow more quantity than available quantity', async ({}) => {

        // dont know how to test this. seems all items have unlimited quantity
    });

    test.skip('should be able to place order', async ({}) => {

        // out of scope for now.
    });
})

async function getProductDetailsAndAddToCart(quantity: number, productNumber: number, homePage: HomePage, productDetailsPage: ProductDetailsPage, page: Page) {
    await homePage.clickProduct(productNumber);

    for (let i = 0; i < quantity; i++) {
        await productDetailsPage.clickAddToCartButton();
        await handleDialogWithWait(page, messages.productAdded);
    }
    return await productDetailsPage.getProductDetails(quantity);
}
