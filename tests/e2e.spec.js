import {test , expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test ('Login' , async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    //await loginPage.login('standard_user', 'secret_sauce');
    //err checkout
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
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