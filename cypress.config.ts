import { defineConfig } from 'cypress';
import 'dotenv/config';

export default defineConfig({
  defaultCommandTimeout: 10000,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: 'http://localhost:8082',
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(_on, config) {
      config.env.apiUrl = process.env.YLITSE_API_URL;
      config.env.apiUser = process.env.YLITSE_API_USER;
      config.env.apiPass = process.env.YLITSE_API_PASS;
      config.env.mfaSecret = process.env.YLITSE_MFA_SECRET;
      return config;
    },
  },
  viewportWidth: 1600,
});
