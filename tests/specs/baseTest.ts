import { test as base, expect, Page} from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { config } from '../conf/config';
import { HeaderPage } from "../pages/header.page";

export const test = base.extend<{ homePage: HomePage, headerPage: HeaderPage }>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.openHomePage(config.homePageUrl);
        await use(homePage);
    },
    headerPage: async ({ page }, use) => {
        const headerPage = new HeaderPage(page);
        await headerPage.waitForLoginMenu();
        await use(headerPage);
    },
});

export { expect };