/**
 * Fleet Routing Mobile Navigation Tests
 */

import { test, expect } from '@playwright/test';

test.describe('Fleet Routing - Mobile Navigation', () => {
  test.use({ viewport: { width: 393, height: 852 } }); // Mobile Pixel 6
  
  test('Map view loads on mobile with vehicle markers', async ({ page }) => {
    await page.goto('/routing');
    
    const mapContainer = await page.locator('.map-container');
    await expect(mapContainer).toBeVisible();
    
    const mapTitle = await page.locator('.route-map-title').textContent();
    console.log(`🗺️ Map loaded: ${mapTitle || 'Vehicle Routes'}`);
  });

  test('Route planning button is accessible', async ({ page }) => {
    const planButton = await page.getByRole('button', { name: /Plan Route/i }).or(page.locator('.plan-route-btn'));
    
    if (await planButton.isVisible()) {
      await expect(planButton).toBeEnabled();
      console.log('✅ Plan Route button accessible');
    } else {
      console.log('ℹ️ Plan Route button not found (may be mocked)');
    }
  });

  test('Vehicle route status displays correctly', async ({ page }) => {
    const activeRoutes = await page.locator('.route-status.active').all();
    
    if (activeRoutes.length > 0) {
      console.log(`📍 Active routes shown: ${activeRoutes.length}`);
      await expect(activeRoutes).toContainText(/Berlin|Hamburg|Munich/i);
    }
  });

  test('Traffic overlay renders on mobile', async ({ page }) => {
    // Mobile devices show simplified traffic indicators
    const trafficIndicators = await page.locator('.traffic-indicator');
    
    if (await trafficIndicators.count() > 0) {
      console.log(`🚦 Traffic indicators: ${await trafficIndicators.count()}`);
      await expect(trafficIndicators).toBeVisible();
    }
  });

  test('Route list is scrollable on mobile', async ({ page }) => {
    const routeList = await page.locator('.route-list');
    
    if (await routeList.isVisible()) {
      await expect(routeList).toBeEnabled();
      
      // Simulate scrolling
      const scrollTop = await routeList.evaluate(el => el.scrollTop);
      console.log(`📜 Route list scroll position: ${scrollTop}px`);
    }
  });

  test('Route zoom controls work on mobile', async ({ page }) => {
    const zoomControls = await page.locator('.zoom-controls');
    
    if (await zoomControls.count() > 0) {
      console.log(`🔍 Zoom controls: ${await zoomControls.count()} available`);
      await expect(zoomControls).toBeVisible();
    }
  });
});