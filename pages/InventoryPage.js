const {expect} = require('@playwright/test');
export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]')
        this.inventoryList = page.locator('[data-test="inventory-container"]')
        this.productSort = page.locator('[data-test="product-sort-container"]')
        this.mostExpensiveItem = page.locator('.inventory_item_name')
        this.addToCartButton = (itemName) => {
            //у всех локаторов похожий паттерн add-to-cart-sauce-labs-bike-light
            const anyName = itemName.toLowerCase().replace(/\s/g, '-');
            return page.locator(`[data-test="add-to-cart-${anyName}"]`);

        }

    }
     async itemSort () {
        await this.productSort.selectOption('hilo');
    }
    async takingMostExpItem () {
        return this.mostExpensiveItem.first().textContent();
    }
    async addItemToCart(itemName) {
        await this.addToCartButton(itemName).click();
    }
    async openCart() {
        await this.shoppingCart.click();
    }
    async getPageTitle() {
        return this.pageTitle.textContent();
    }

}