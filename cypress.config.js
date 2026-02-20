const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
