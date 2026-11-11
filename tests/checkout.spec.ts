import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { users } from './data/users';

test('should successfully complete checkout', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.navigate();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    // Add product
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Open cart and checkout
    await cartPage.navigateToCart();
    await cartPage.checkoutButton.click();

    // Enter customer details
    await checkoutPage.enterCustomerDetails(
        'Thulani',
        'Mothwa',
        '0001'
    );

    // Continue to order overview
    await checkoutPage.continueToOverview();

    // Finish order
    await checkoutPage.finishOrder();

    // Verify order confirmation
    await expect(checkoutPage.confirmationMessage).toBeVisible();
});
test('should display an error when first name is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.navigate();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    // Add product to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart and checkout
    await cartPage.navigateToCart();
    await cartPage.checkoutButton.click();

    // Leave first name empty
    await checkoutPage.enterCustomerDetails('', 'Mothwa', '0001');

    // Attempt to continue
    await checkoutPage.continueToOverview();

    // Verify error message
    await expect(checkoutPage.errorMessage)
        .toContainText('First Name is required');
});
test('should display an error when last name is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.navigate();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    // Add product to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart and checkout
    await cartPage.navigateToCart();
    await cartPage.checkoutButton.click();

    // Leave last name empty
    await checkoutPage.enterCustomerDetails('Thulani', '', '0001');

    // Attempt to continue
    await checkoutPage.continueToOverview();

    // Verify error message
    await expect(checkoutPage.errorMessage)
        .toContainText('Last Name is required');
});