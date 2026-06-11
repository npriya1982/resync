const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  
  // Shared settings for all the projects below
  use: {
    headless: false,
    
    // 💥 ADD THIS LINE RIGHT HERE 
    video: 'on', 
    
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});