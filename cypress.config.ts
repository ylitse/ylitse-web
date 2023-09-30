import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 10000,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
  },
});
