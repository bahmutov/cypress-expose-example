const { defineConfig } = require('cypress')
const cypressExpose = require('cypress-expose')

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,

    setupNodeEvents(on, config) {
      cypressExpose(config)

      // IMPORTANT: return the config object
      // to let Cypress know we modified it
      return config
    },
  },
})
