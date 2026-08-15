import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test ('Full purchase flow' , async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutFinish = new CheckoutStepTwoPage(page);
    const completePage = new CheckoutCompletePage(page);
    //login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    //inventorypage
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');
    //hight low , vice versa
    await inventoryPage.itemSort();
    const mostExpitem = await inventoryPage.takingMostExpItem();
    await inventoryPage.addItemToCart(mostExpitem);
    await inventoryPage.openCart();
    //cartpage
    const currentCartItem = await cartPage.getFirstItemInCart();
    expect(currentCartItem).toBe(mostExpitem);
    await cartPage.goToCheckout();
    //checkout step one
    await checkoutStepOne.fillUserInfo('Test', 'User', '12345');
    //checkout step two
    await checkoutFinish.finishCheckout();
    //complete page 
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