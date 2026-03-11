const { defineConfig } = require('cypress')
const camel = require('to-camel-case')

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,

    // MUST DECLARE ALL POSSIBLE FIELDS
    // otherwise cannot overwrite them inside setupNodeEvents
    expose: {
      answer: 0,
    },

    setupNodeEvents(on, config) {
      console.log('env', config.env)
      console.log('expose', config.expose)

      Object.entries(config.env).forEach(([key, value]) => {
        if (key.startsWith('EXPOSE_')) {
          const name = key.replace('EXPOSE_', '')
          const normalizedName = camel(name)
          config.expose[normalizedName] = value
          delete config.env[key]
        }
      })

      console.log('exposed fields')
      console.log('env', config.env)
      console.log('expose', config.expose)

      // IMPORTANT: return the config object
      // to let Cypress know we modified it
      return config
    },
  },
})
