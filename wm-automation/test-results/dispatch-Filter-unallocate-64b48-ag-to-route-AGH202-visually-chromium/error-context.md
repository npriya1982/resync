# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dispatch.spec.js >> Filter unallocated jobs and drag to route AGH202 visually
- Location: tests\dispatch.spec.js:6:5

# Error details

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { NavigationPage } from '../pages/NavigationPage';
  4  | import { DispatchPage } from '../pages/DispatchPage';
  5  | 
  6  | test('Filter unallocated jobs and drag to route AGH202 visually', async ({ page }) => {
  7  |   const loginPage = new LoginPage(page);
  8  |   const navigationPage = new NavigationPage(page);
  9  |   const dispatchPage = new DispatchPage(page);
  10 | 
  11 |   // 1. Authentication
  12 |   await loginPage.goto();
  13 |   await loginPage.login('resynctest', 'password123');
  14 | 
  15 |   // 2. Navigation
  16 |   await navigationPage.navigateToWithDispatch();
  17 | 
  18 |   // 3. Filter Layout
  19 |   await dispatchPage.filterByUnallocated();
  20 | 
  21 |   // 4. Capture Initial Count State
  22 |   const initialCount = await dispatchPage.getRouteActiveCount('AGH202');
  23 |   const expectedCount = initialCount + 1;
  24 | 
  25 |   // 5. Execute Visual Move
  26 |   await dispatchPage.dragFirstUnallocatedJobToRoute('AGH202');
  27 | 
  28 |   // 6. Assert Result
  29 |   const targetRouteLocator = dispatchPage.getTargetRoute('AGH202');
  30 |   const expectedTextPattern = new RegExp(`AGH202.*${expectedCount}\\s*ACTIVE`, 'is');
  31 |   await expect(targetRouteLocator).toHaveText(expectedTextPattern);
  32 | 
  33 |   // Leave browser window active for inspection
> 34 |   await page.waitForTimeout(9999999);
     |              ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  35 | });
```