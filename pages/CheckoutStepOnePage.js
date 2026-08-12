// Страница оформления заказа (шаг 1: ввод данных).
//Элементы: поле для имени, поле для фамилии, поле для почтового индекса, кнопка "Continue".
//Методы: fillUserInfo(firstName, lastName, postalCode).
const {expect} = require('@playwright/test');
export class CheckoutStepOnePage {
    constructor(page) {
        this.page = page;
        this.firstNameBar =page.locator('[data-test="firstName"]')
        this.lastNameBar = page.locator('[data-test="lastName"]')
        this.postalCode = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
    }
    async fillUserInfo(firstName, lastName, postalCode) {
        await this.firstNameBar.fill(firstName)
        await this.lastNameBar.fill(lastName)
        await this.postalCode.fill(postalCode)
        await this.continueButton.click()
    }
}