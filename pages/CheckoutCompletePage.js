// Страница с сообщением об успешном заказе.
//Элементы: заголовок "Thank you for your order!", кнопка "Back Home".
//Методы: getCompletionMessage().
const {expect} = require('@playwright/test');
export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.competedOrder = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');

    }
    async getCompletionMessage() {
        return await this.competedOrder.textContent();
    }
}
