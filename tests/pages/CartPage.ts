import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout'
        });
    }

    async navigateToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async verifyProductInCart(productName: string) {
        return this.cartItems.filter({ hasText: productName });
    }
}