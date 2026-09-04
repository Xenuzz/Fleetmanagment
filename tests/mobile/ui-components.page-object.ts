/**
 * UI Page Objects for Mobile Testing
 * Implements Playwright best practices with accessibility locators
 */

export class FleetDashboardPage {
  private readonly baseURL: string;

  constructor(baseURL: string = 'http://localhost:3000') {
    this.baseURL = baseURL;
  }

  // Locators using accessibility labels (Playwright best practice)
  private readonly header = this.locator('#app-header');
  private readonly dashboardTitle = this.locator('h1.fleet-dashboard-title');
  private readonly vehicleSection = this.locator('.vehicle-section');
  private readonly driverSection = this.locator('.driver-section');
  
  // Vehicle cards by status
  private readonly activeVehicles = this.locator('.vehicle-card.active');
  private readonly maintenanceVehicles = this.locator('.vehicle-card.maintenance');
  private readonly inactiveVehicles = this.locator('.vehicle-card.inactive');
  
  // Driver cards by status
  private readonly onDutyDrivers = this.locator('.driver-card.on-duty');
  private readonly activeDrivers = this.locator('.driver-card.active');

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.dashboardTitle.textContent();
  }

  /**
   * Verify dashboard is loaded
   */
  async expectDashboardLoaded(): Promise<void> {
    await expect(this.header).toBeVisible({ timeout: 5000 });
    await expect(this.dashboardTitle).toHaveText(/Fleet Management/i);
    await expect(this.vehicleSection).toBeVisible();
    await expect(this.driverSection).toBeVisible();
  }

  /**
   * Get active vehicle count
   */
  async getActiveVehicleCount(): Promise<number> {
    return await this.activeVehicles.count();
  }

  /**
   * Get maintenance vehicle count
   */
  async getMaintenanceVehicleCount(): Promise<number> {
    return await this.maintenanceVehicles.count();
  }

  /**
   * Get on-duty driver count
   */
  async getOnDutyDriverCount(): Promise<number> {
    return await this.onDutyDrivers.count();
  }

  /**
   * Click on active vehicle card
   */
  async clickVehicleByIndex(index: number): Promise<void> {
    const vehicles = await this.activeVehicles.all();
    if (index < vehicles.length) {
      await vehicles[index].click({ timeout: 5000 });
      await expect(this.dashboardTitle).toHaveText(/Vehicle Details/i);
    }
  }

  /**
   * Click on driver card
   */
  async clickDriverByIndex(index: number): Promise<void> {
    const drivers = await this.onDutyDrivers.all();
    if (index < drivers.length) {
      await drivers[index].click({ timeout: 5000 });
      await expect(this.dashboardTitle).toHaveText(/Driver Profile/i);
    }
  }

  /**
   * Verify system status indicator
   */
  async verifySystemOnline(): Promise<boolean> {
    const isVisible = await this.locator('.status-indicator.active').isVisible();
    return isVisible;
  }

  /**
   * Get vehicle count from UI
   */
  async getVehiclesCountFromUI(): Promise<string> {
    const badge = await this.vehicleSection.locator('h2').first().textContent();
    if (!badge) return '0';
    
    // Extract number from "Active Vehicles (X)"
    const match = badge?.match(/\(\d+\)/);
    return match ? match[1] : '0';
  }

  /**
   * Get driver count from UI
   */
  async getDriversCountFromUI(): Promise<string> {
    const badge = await this.driverSection.locator('h2').first().textContent();
    if (!badge) return '0';
    
    const match = badge?.match(/\(\d+\)/);
    return match ? match[1] : '0';
  }
}

export default FleetDashboardPage;