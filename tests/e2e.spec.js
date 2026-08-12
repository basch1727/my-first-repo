import {test , expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test ('Full purchase flow' , async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const inventoryPage = new InventoryPage(page);
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');
    //hight low , vice versa
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const mostExpensiveItem = await page.locator('.inventory_item_name').first().textContent();
    await inventoryPage.addItemToCart(mostExpensiveItem);
    await inventoryPage.openCart();

    
});


/*
test('is locked user chechout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
});
*/