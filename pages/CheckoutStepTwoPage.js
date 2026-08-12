//Страница подтверждения заказа (шаг 2: обзор).
//Элементы: информация о заказе, итоговая сумма, кнопка "Finish".
//Методы: finishCheckout().
const {expect} = require('@playwright/test');
export class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.cartNfo = page.locator('[data-test="cart-list"]');
        this.totalPaymentNfo = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]')
        //locator('[data-test="payment-info-label"]')
        //locator('[data-test="total-info-label"]')
        //locator('[data-test="total-label"]')
        
    }
    async finishCheckout() {
        await this.finishButton.click()
    }
}