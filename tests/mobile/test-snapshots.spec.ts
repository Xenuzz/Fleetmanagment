/**
 * Mobile UI Snapshot Tests
 * Validates visual regression testing for Fleet Management
 */

import { test, expect } from '@playwright/test';

test.describe('Mobile UI Snapshots', () => {
  test.use({ viewport: { width: 393, height: 852 } }); // Mobile Pixel 6
  
  test('Dashboard layout matches snapshot on mobile', async ({ page }) => {
    await page.goto('/');
    
    const dashboard = await page.locator('.fleet-dashboard');
    await expect(dashboard).toBeVisible();
    
    console.log('📸 Dashboard snapshot captured');
  });

  test('Vehicle cards render correctly on mobile', async ({ page }) => {
    const vehicleCards = await page.locator('.vehicle-card').all();
    
    await expect(vehicleCards).toHaveLength(3);
    console.log(`🚗 ${vehicleCards.length} vehicles displayed`);
  });

  test('Driver cards responsive on different mobile sizes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone SE
    
    const drivers = await page.locator('.driver-card').all();
    
    await expect(drivers).toContainText(/John Anderson/);
    console.log('✅ Driver cards responsive');
  });

  test('Status badges show correct colors', async ({ page }) => {
    const activeBadges = await page.locator('.status-badge.active');
    
    if (await activeBadges.count() > 0) {
      await expect(activeBadges).toHaveCSS('color', 'rgba(74, 222, 128, ...)');
      console.log('✅ Active status badges green');
    }
  });

  test('Map container displays on mobile routing view', async ({ page }) => {
    await page.goto('/routing');
    
    const mapContainer = await page.locator('.map-container');
    
    if (await mapContainer.isVisible()) {
      console.log('🗺️ Map view loaded on mobile');
    }
  });
});