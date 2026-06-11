import { expect } from '@playwright/test';

export class DispatchPage {
  constructor(page) {
    this.page = page;
    // Filter controls
    this.columnSettings = page.getByRole('link', { description: 'Column Settings', exact: true }).nth(3);
    this.filterTab = page.locator('span').filter({ hasText: 'Filter' });
    this.unallocatedLabel = page.locator('label').filter({ hasText: 'Unallocated' });
    this.filterButton = page.getByRole('button', { name: 'Filter' });

    // Dynamic locators (Instantiated as methods to ensure fresh DOM state querying)
    this.getJobRow = () => this.page.locator('tr:has-text("Unallocated")').first();
    this.getDragSourceCell = () => this.getJobRow().locator('td', { hasText: 'Unallocated' }).first();
    this.getTargetRoute = (routeName) => this.page.getByRole('option', { name: new RegExp(routeName, 'i') }).first();
  }

  async filterByUnallocated() {
    await this.columnSettings.click();
    await this.filterTab.click();
    await this.unallocatedLabel.click();
    await this.filterButton.click();
    
    // Critical synchronization step
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000); 
  }

  async getRouteActiveCount(routeName) {
    const route = this.getTargetRoute(routeName);
    await route.scrollIntoViewIfNeeded();
    const text = await route.innerText();
    const match = text.match(/(\d+)\s*ACTIVE/i);
    if (!match) throw new Error(`Could not find ACTIVE count for route ${routeName}`);
    return parseInt(match[1], 10);
  }

  async dragFirstUnallocatedJobToRoute(routeName) {
    const sourceCell = this.getDragSourceCell();
    const targetRoute = this.getTargetRoute(routeName);

    await sourceCell.scrollIntoViewIfNeeded();
    await expect(sourceCell).toBeVisible();
    await targetRoute.scrollIntoViewIfNeeded();
    await expect(targetRoute).toBeVisible();

    const sourceBox = await sourceCell.boundingBox();
    const routeBox = await targetRoute.boundingBox();

    if (sourceBox && routeBox) {
      // 1. Grab from left margin
      await this.page.mouse.move(sourceBox.x + (sourceBox.width / 6), sourceBox.y + (sourceBox.height / 2));
      await this.page.mouse.down();
      await this.page.waitForTimeout(400); 

      // 2. Drag smoothly
      await this.page.mouse.move(
        routeBox.x + (routeBox.width / 2), 
        routeBox.y + (routeBox.height / 2), 
        { steps: 50 }
      );

      // 3. Complete Drop
      await this.page.waitForTimeout(600); 
      await this.page.mouse.up();
    }
    
    await this.page.waitForLoadState('networkidle');
  }
}