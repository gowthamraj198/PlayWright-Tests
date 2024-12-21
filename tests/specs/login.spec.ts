import {TestAccount} from "../test-data/Account";
import {LoginModal} from "../pages/login.page";
import { test, expect } from './baseTest';
import {handleDialog} from "../util/dialogHandler";
import {messages} from "../test-data/validationText";
import {randomInt} from "node:crypto";


test.describe('Login', () => {

    let loginModal: LoginModal;

    test.beforeEach(async ({ page, homePage }) => {
        loginModal = new LoginModal(page);
    });

    test('verify all elements', async ({headerPage}) => {
        await headerPage.clickLoginMenuInHeader();
        await loginModal.verifyAllElements();
    });

    test('should allow user to login successfully', async ({headerPage}) => {
        await headerPage.clickLoginMenuInHeader();
        await loginModal.enterUsername(TestAccount.user);
        await loginModal.enterPassword(TestAccount.pwd);
        await loginModal.clickLoginButtonInModal();
        await loginModal.verifyUser(TestAccount.user);
        await loginModal.verifyLoginModalDisappear();
    });

    test('should allow user to close the login modal', async ({headerPage}) => {
        await headerPage.clickLoginMenuInHeader();
        await loginModal.clickCloseButtonInModal();
        await loginModal.verifyLoginModalDisappear();
    });

    test('should allow user to cancel the login', async ({headerPage}) => {
        await headerPage.clickLoginMenuInHeader();
        await loginModal.clickCancelButtonInModal();
        await loginModal.verifyLoginModalDisappear();
    });

    //error scenarios

    test('should show error message if username is empty', async ({page, headerPage}) => {
        await headerPage.clickLoginMenuInHeader();
        await loginModal.enterPassword(TestAccount.pwd);
        await loginModal.clickLoginButtonInModal();

        await handleDialog(page, messages.usernamePasswordMandatoryMessage);
    });

    test('should show error message if password is empty', async ({page, headerPage}) => {
        await headerPage.clickLoginMenuInHeader();
        await loginModal.enterUsername(TestAccount.user);
        await loginModal.clickLoginButtonInModal();

        await handleDialog(page, messages.usernamePasswordMandatoryMessage);
    });

    test('should show error message if username does not exist', async ({page, headerPage}) => {
        await headerPage.clickLoginMenuInHeader();
        await loginModal.enterUsername(`${TestAccount.user}${randomInt(10004, 999999)}`);
        await loginModal.enterPassword(TestAccount.pwd);
        await loginModal.clickLoginButtonInModal();
        await handleDialog(page, messages.invalidUser);
    });

    test('should show error message if password does not match', async ({page, headerPage}) => {
        await headerPage.clickLoginMenuInHeader();
        await loginModal.enterPassword(`${TestAccount.pwd}${randomInt(10004, 999999)}`);
        await loginModal.enterUsername(TestAccount.user);
        await loginModal.clickLoginButtonInModal();
        await handleDialog(page, messages.invalidPassword);
    });
})
