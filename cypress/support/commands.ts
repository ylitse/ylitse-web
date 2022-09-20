/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

Cypress.Commands.add('fillInput', (id: string, value: string): void => {
  cy.get(`input[id="${id}"]`).type(value).blur();
});

Cypress.Commands.add(
  'registerUser',
  (username: string, password: string): void => {
    const toggle = (input: string): void => {
      cy.get(`input[id="${input}"]`).parent().click();
    };

    cy.visit('/register');
    cy.fillInput('username', username);
    cy.fillInput('password', password);
    cy.fillInput('password-confirmation', password);
    cy.fillInput('display-name', 'exampleDisplayName');
    toggle('required-age');
    toggle('privacy-consent');
    cy.get(`button[id="submit"]`).click();
  },
);

declare namespace Cypress {
  interface Chainable {
    fillInput(id: string, value: string): Chainable<void>;
    registerUser(username: string, password: string): Chainable<void>;
  }
}
