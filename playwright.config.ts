import { defineConfig, devices } from '@playwright/test';
import { devices as mobileDevices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fully: {
    enabled: true
  },
  projects: [
    // Mobile Testing - Playwright Skills
    {
      name: 'Mobile Chrome',
      use: {
        ...mobileDevices['Pixel 6'],
        viewport: { width: 393, height: 852 },
        deviceScaleFactor: 2.75,
        isMobile: true,
        hasTouch: true
      }
    },
    {
      name: 'Mobile Firefox',
      use: {
        ...mobileDevices['Pixel 6'],
        viewport: { width: 393, height: 852 },
        deviceScaleFactor: 2.75,
        isMobile: true,
        hasTouch: true
      }
    },
    // Desktop fallback für debugging
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  reporter: [
    ['html', { outputFolder: 'test-results' }],
    ['json', { outputFile: 'test-report.json' }],
    ['list']
  ],
  testDir: 'tests/mobile',
  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  }
});