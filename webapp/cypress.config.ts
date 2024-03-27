import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  videoCompression: true,
  pageLoadTimeout: 80000,
  defaultCommandTimeout: 20000,
  requestTimeout: 8000,
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
