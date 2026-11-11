import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { users } from './data/users';

test('should display an added product in the shopping cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.navigate();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    // Add product to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to shopping cart
    await cartPage.navigateToCart();

    // Verify product appears in cart
    await expect(
        await cartPage.verifyProductInCart('Sauce Labs Backpack')
    ).toBeVisible();

});