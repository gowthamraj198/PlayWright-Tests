import {expect, Page} from '@playwright/test';

export async function handleDialog(page: Page, expectedMessage: string) {
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain(expectedMessage);
        await dialog.accept();
    });
}

export async function handleDialogWithWait(page: Page, expectedMessage: string, timeout: number = 5000) {
    const dialog = await page.waitForEvent('dialog', { timeout });
    expect(dialog.message()).toContain(expectedMessage);
    await dialog.accept();
}