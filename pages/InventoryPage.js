const {expect} = require('@playwright/test');
export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.getByText('Swag Labs');
        this.shopingCart = page.locator('[data-test="shopping-cart-link"]')
        this.inventoryList = page.locator('[data-test="inventory-container"]')
        //this.addToCartButton = page.locator(getByText('Add to cart'))
        //делайем динамическую кнопку (будет работать для любого товара)
        this.addToCartButton = (itemName) => {
            //у всех локаторов похожий паттерн add-to-cart-sauce-labs-bike-light
            const anyName = itemName.toLowerCase().replace(/\s/g, '-');
            return page.locator(`[data-test="add-to-cart-${anyName}"]`);

        }
    }
    async addItemToCart(itemName) {
        await this.addToCartButton(itemName).click();
    }
    async openCart() {
        await this.shopingCart.click();
    }
    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

}