import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { users } from './data/users';


test('should successfully login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
});
test('should display an error for an invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        users.invalidPasswordUser.username,
        users.invalidPasswordUser.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
        'Username and password do not match'
    );
});

test('should display an error when credentials are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        users.emptyUser.username,
        users.emptyUser.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
        'Username is required'
    );
    });
    
test('should add a product to the shopping cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login
    await loginPage.navigate();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    // Add product to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Verify cart quantity
    await expect(productsPage.cartBadge).toHaveText('1');
});