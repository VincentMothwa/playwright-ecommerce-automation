
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { users } from './data/users';

test('user can log in successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

await loginPage.login(
    users.validUser.username,
    users.validUser.password
);

    await expect(page).toHaveURL(/inventory/);

    await expect(
        page.getByText('Products', { exact: true })
    ).toBeVisible();

});
test('login shows an error with an incorrect password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

 await loginPage.login(
    users.invalidPasswordUser.username,
    users.invalidPasswordUser.password
);

    await expect(loginPage.errorMessage).toBeVisible();

});
test('login shows an error when credentials are empty', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('', '');

    await expect(loginPage.errorMessage)
        .toContainText('Username is required');

});

test('locked out user cannot log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out.');
});

test('user can add a product to the shopping cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await expect(page.locator('[data-test="shopping-cart-badge"]'))
    .toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.getByText('Sauce Labs Backpack'))
    .toBeVisible();
});

test('user can remove a product from the shopping cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  await page.getByRole('button', { name: 'Remove' }).click();

  await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();

  await expect(page.locator('[data-test="shopping-cart-badge"]'))
    .not.toBeVisible();
});

test('user can proceed to checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await page.locator('[data-test="shopping-cart-link"]').click();

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.locator('[data-test="firstName"]').fill('Vince');
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="postalCode"]').fill('0001');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/checkout-step-two/);

  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();
});

test('user can complete an order successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Add product to cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Go to checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Enter customer details
  await page.locator('[data-test="firstName"]').fill('Vince');
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="postalCode"]').fill('0001');

  await page.getByRole('button', { name: 'Continue' }).click();

  // Finish the order
  await page.getByRole('button', { name: 'Finish' }).click();

  // Verify order confirmation
  await expect(page.getByRole('heading', {
    name: 'Thank you for your order!'
  })).toBeVisible();

  await expect(page.getByText(
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  )).toBeVisible();
});
