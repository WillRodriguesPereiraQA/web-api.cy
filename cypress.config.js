const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupPlugins(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)],
  });

  on("file:preprocessor", bundler);

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: setupPlugins,
    // Alterado: Foca apenas em arquivos .feature como specs válidas
    specPattern: "cypress/e2e/**/*.feature", 
    baseUrl: "https://www.automationexercise.com/",
    pageLoadTimeout: 180000,
    defaultCommandTimeout: 30000,
    requestTimeout: 60000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    // CORREÇÃO AQUI: O mapeamento de passos deve ficar dentro do bloco env
    env: {
      stepDefinitions: [
        "cypress/e2e/api/**/*.{js,ts}",
        "cypress/e2e/web/**/*.{js,ts}",
        "cypress/e2e/ui/**/*.{js,ts}",
        "cypress/support/step_definitions/**/*.{js,ts}"
      ],
      omitFilteredSteps: true
    }
  },
});
