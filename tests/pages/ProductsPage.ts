import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addProductToCart(productName: string) {
        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    }
}