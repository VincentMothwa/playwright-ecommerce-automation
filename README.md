
# E-Commerce Test Automation Project

## Project Overview

This project is an end-to-end test automation portfolio built using Playwright and TypeScript.

The project focuses on automating key e-commerce user journeys on the SauceDemo application, including user authentication, product selection, shopping cart functionality, and checkout.

The objective is to demonstrate practical automation testing skills, reusable test architecture, and the ability to identify and validate both positive and negative test scenarios.

## Technologies Used

- Playwright
- TypeScript
- Node.js
- Git
- GitHub
- Visual Studio Code

## Application Under Test

SauceDemo: https://www.saucedemo.com/

## Testing Scope

The following scenarios are covered:

1. User login and authentication.
2. Product selection and adding products to the shopping cart.
3. Shopping cart validation.
4. Successful checkout.
5. Checkout form validation.
6. Negative testing for missing customer information.
7. Cross-browser testing.

## Project Structure

```text
playwright-ecommerce-v2/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── tests/
│   ├── data/
│   │   └── users.ts
│   │
│   ├── pages/
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── LoginPage.ts
│   │   └── ProductsPage.ts
│   │
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── example.spec.ts
│   └── login.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## Test Execution

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

View the HTML test report:

```bash
npx playwright show-report
```

## Test Results

The project currently has a successful execution of 48 tests across the configured browser projects.

## Author

Vincent Mothwa

QA / Test Analyst | Learning Test Automation
