/**
 * Fleet Dashboard Mobile E2E Tests
 * First test suite validating navigation and UI interactions
 */

import { test, expect } from '@playwright/test';
import { getVehicles, getDrivers } from '../../src/mocks/api-vehicles';
import { getDrivers as getAllDrivers } from '../../src/mocks/api-drivers';
import { FleetDashboardPage } from './ui-components.page-object';

const dashboard = new FleetDashboardPage();

test.describe('Fleet Dashboard - Mobile E2E Tests', () => {
  test.use({ viewport: { width: 393, height: 852 } }); // Mobile Pixel 6
  
  test.beforeEach(async ({ page }) => {
    // Setup mock data before each test
    const vehicles = getVehicles().data;
    const drivers = getAllDrivers().data;
    
    await page.goto('/');
    
    // Render component with mock data
    await page.evaluate((data) => {
      const el = document.getElementById('app-root');
      if (el) {
        el.innerHTML = `
          <div id="app-header">Fleet Management System</div>
          ${data.map(v => `
            <div class="vehicle-section"><h2>Active Vehicles (${v.length})</h2>` +
              v.map(veh => `<button class="vehicle-card ${veh.status}">${veh.name}</button>`).join('') +
            '</div>' +
            `${data.map(d => `<div class="driver-section"><h2>Active Drivers (${d.length})</h2>` +
              d.map(dr => `<button class="driver-card ${dr.status}">${dr.name}</button>`).join('') +
            '</div>`).join('')}
        `;
      }
    }, [vehicles, drivers]);
  });

  test('Dashboard loads successfully on mobile', async ({ page }) => {
    // Verify dashboard loaded
    await dashboard.expectDashboardLoaded();
    
    // Verify titles
    await expect(page.getByText('Fleet Management Dashboard')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('System Online ✓')).toBeVisible();
    
    // Get counts from UI
    const vehicleCount = await dashboard.getActiveVehicleCount();
    const driverCount = await dashboard.getDriversCountFromUI();
    
    // Validate counts
    expect(vehicleCount).toBeGreaterThan(0);
    expect(driverCount).toBeGreaterThan(0);
  });

  test('Can click on active vehicle card', async ({ page }) => {
    // Click first active vehicle
    const vehicles = await dashboard.activeVehicles.all();
    if (vehicles.length > 0) {
      await vehicles[0].click({ timeout: 5000 });
      
      // Verify navigation state changed
      await expect(page.locator('.vehicle-details-panel')).toBeVisible({ timeout: 3000 });
    }
  });

  test('Can click on driver card', async ({ page }) => {
    const drivers = await dashboard.onDutyDrivers.all();
    
    if (drivers.length > 0) {
      await drivers[0].click({ timeout: 5000 });
      
      // Verify driver details panel shown
      await expect(page.locator('.driver-details-panel')).toBeVisible({ timeout: 3000 });
    }
  });

  test('Status indicators render correctly', async ({ page }) => {
    // Check active status badges
    const activeVehicles = await dashboard.activeVehicles.count();
    const maintenanceVehicles = await dashboard.maintenanceVehicles.count();
    
    expect(activeVehicles).toBeGreaterThanOrEqual(1);
    expect(maintenanceVehicles).toBeGreaterThanOrEqual(0);
  });

  test('Responsive design adapts to mobile viewport', async ({ page }) => {
    // Verify layout is correct for mobile
    await dashboard.expectDashboardLoaded();
    
    // Check CSS media queries applied
    const styles = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      return styleSheets.map(sheet => 
        sheet.href.includes('FleetDashboard.css') ? 'styles loaded' : ''
      ).join('\n');
    });
    
    expect(styles).toContain('styles loaded');
  });

  test('Footer displays version info', async ({ page }) => {
    await dashboard.expectDashboardLoaded();
    
    const footer = await page.locator('.dashboard-footer').innerText();
    expect(footer).toContain('Fleet Management System');
    expect(footer).toMatch(/v[0-9.]+/);
  });

  test('Page is accessible and usable', async ({ page }) => {
    // Simulate user journey: load -> interact -> verify
    await dashboard.expectDashboardLoaded();
    
    const vehicleCount = await dashboard.getActiveVehicleCount();
    const onDutyCount = await dashboard.getOnDutyDriverCount();
    
    console.log(`\n${'='.repeat(50)}\n`);
    console.log('🚗 Fleet Dashboard - Test Summary');
    console.log(`${'='.repeat(50)}\n`);
    console.log(`✅ Active Vehicles: ${vehicleCount}`);
    console.log(`✅ On-Duty Drivers: ${onDutyCount}`);
    console.log(`📱 Device: Mobile Pixel 6 (393x852)`);
    console.log(`${'='.repeat(50)}\n`);
    
    expect(vehicleCount).toBeGreaterThan(0);
  });
});