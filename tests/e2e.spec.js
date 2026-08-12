import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test ('Full purchase flow' , async ({page}) => {
    //login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    //inventorypage
    const inventoryPage = new InventoryPage(page);
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');
    //hight low , vice versa
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const mostExpensiveItem = await page.locator('.inventory_item_name').first().textContent();
    await inventoryPage.addItemToCart(mostExpensiveItem);
    await inventoryPage.openCart();
    //cartpage
    const cartPage = new CartPage(page);
    const currentCartItem = await cartPage.getFirstItemInCart();
    expect(currentCartItem).toBe(mostExpensiveItem);
    await cartPage.goToCheckout();
    //checkout step one
    const checkoutStepOne = new CheckoutStepOnePage(page);
    await checkoutStepOne.fillUserInfo('Test', 'User', '12345');
    //checkout step two
    const checkoutFinish = new CheckoutStepTwoPage(page);
    await checkoutFinish.finishCheckout();
    //complete page 
    const completePage = new CheckoutCompletePage(page);
    const purchaseCompletedMsg = await completePage.getCompletionMessage();
    expect(purchaseCompletedMsg).toBe('Thank you for your order!');
    
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