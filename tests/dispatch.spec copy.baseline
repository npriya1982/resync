import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavigationPage } from '../pages/NavigationPage';
import { DispatchPage } from '../pages/DispatchPage';

test('Filter unallocated jobs and drag to route AGH202 visually', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const navigationPage = new NavigationPage(page);
  const dispatchPage = new DispatchPage(page);

  // 1. Authentication
  await loginPage.goto();
  await loginPage.login('resynctest', 'password123');

  // 2. Navigation
  await navigationPage.navigateToWithDispatch();

  // 3. Filter Layout
  await dispatchPage.filterByUnallocated();

  // 4. Capture Initial Count State
  const initialCount = await dispatchPage.getRouteActiveCount('AGH202');
  const expectedCount = initialCount + 1;

  // 5. Execute Visual Move
  await dispatchPage.dragFirstUnallocatedJobToRoute('AGH202');

  // 6. Assert Result
  const targetRouteLocator = dispatchPage.getTargetRoute('AGH202');
  const expectedTextPattern = new RegExp(`AGH202.*${expectedCount}\\s*ACTIVE`, 'is');
  await expect(targetRouteLocator).toHaveText(expectedTextPattern);

  // Leave browser window active for inspection
  await page.waitForTimeout(9999999);
});