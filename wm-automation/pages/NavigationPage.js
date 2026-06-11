// ..pages/NavigationPage.js

class NavigationPage {
  constructor(page) {
    this.page = page;
    this.dashboardItem = page.locator('text=HOME').first();
    this.dispatchLink = page.locator('a, li, [role="link"]').filter({ hasText: /DISPATCH/i }).first();
  }

  async navigateToWithDispatch() {
    // Wait for the navigation side panel container to be ready
    await this.dashboardItem.waitFor({ state: 'visible', timeout: 10000 });
    
    // Use force true to bypass any invisible loader containers blocking pointer actions
    await this.dashboardItem.click({ force: true });

    await this.dispatchLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.dispatchLink.click({ force: true });
  }
}

export { NavigationPage };