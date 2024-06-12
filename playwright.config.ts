import { defineConfig, devices } from '@playwright/test';
import { access } from 'fs';
import dotenv from 'dotenv'


require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
            : process.env.STAGE == '1' ? 'http://localhost:4202/'
            : 'http://localhost:4200/',
    extraHTTPHeaders: {
      'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    }
  },
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown.ts'),

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: 'auth.setup.ts' },
    {
      name: 'articleSetup',
      testMatch: 'newArticle.setup.ts', 
      dependencies: ['setup'],
      teardown: 'articleCleanUp'
    },
    {
      name: 'articleCleanUp',
      testMatch: 'articleCeleanUp.setup.ts'
    },
    {
      name: 'likeCounter',
      testMatch: 'api/likesCounter.spec.ts', 
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['articleSetup']
    }, 
    {
      name: 'regression', 
      testIgnore: 'likesCounter.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'dev', 
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: '.auth/user.json',
        baseURL: 'http://localhost:4200/'
      },
      dependencies: ['setup']
    },
    {
      name: 'qa', 
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: '.auth/user.json',
        baseURL: 'http://localhost:4200/'
      },
      dependencies: ['setup']
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: '.auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'mobile',
      testMatch: 'pageObject/testMObile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro'],
        viewport: {width: 414, height: 800}
      }
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    //url: 'http://127.0.0.1:3000',
    url: 'http://localhost:4200',
    //reuseExistingServer: !process.env.CI,
  },
});
