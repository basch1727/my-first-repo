const {expect} = require('@playwright/test');
export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartList = page.locator('[data-test="cart-list"]');
        this.checkOutButton = page.locator('[data-test="checkout"]')
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]')
        
    }
    async goToCheckout() {
        await this.checkOutButton.click();
    }
}

