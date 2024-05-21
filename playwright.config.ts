import {defineConfig, devices} from 'playwright/test';

import {baseUrl, testEnv} from './test/utils';

export default defineConfig({
  testDir: './test/specs',
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: baseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],
  webServer:
    testEnv !== 'local'
      ? undefined
      : {
          command: 'npm run start',
          url: 'http://127.0.0.1:3004',
          reuseExistingServer: !process.env.CI,
          timeout: 180 * 1000,
        },
});
