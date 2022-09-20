/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

Cypress.Commands.add('registerUser', (username: string): void => {
  const fill = (input: string, value: string): void => {
    cy.get(`input[id="${input}"]`).type(value).blur();
  };

  const toggle = (input: string): void => {
    cy.get(`input[id="${input}"]`).parent().click();
  };

  cy.visit('/register');
  fill('username', username);
  fill('password', 'examplePassword');
  fill('password-confirmation', 'examplePassword');
  fill('display-name', 'exampleDisplayName');
  toggle('required-age');
  toggle('privacy-consent');
  cy.get(`button[id="submit"]`).click();
});

declare namespace Cypress {
  interface Chainable {
    registerUser(username: string): Chainable<void>;
  }
}
