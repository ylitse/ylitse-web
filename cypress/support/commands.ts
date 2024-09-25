/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

type LangCode = 'en' | 'fi';

Cypress.Commands.add('switchLanguageBeforeLogin', (lang: LangCode) => {
  if (document.documentElement.lang !== lang) {
    cy.get(`a[id="${lang}-button"]`).click({ force: true });
  }
});

Cypress.Commands.add('switchLanguageAfterLogin', (lang: LangCode) => {
  if (document.documentElement.lang !== lang) {
    cy.get('button[id="lang-dropdown-button"]').click();

    const langButtonText = lang === 'fi' ? 'Fi - Suomeksi' : 'En - In English';
    cy.findByText(langButtonText, 'button').click({ force: true });
  }
});

Cypress.Commands.add('fillInput', (id: string, value: string) => {
  cy.get(`input[id="${id}"]`).type(value).blur();
});

Cypress.Commands.add('findByText', (text: string, selector = '*') => {
  cy.get(selector).contains(text);
});

Cypress.Commands.add('registerUser', (username: string, password: string) => {
  const toggle = (input: string) => {
    cy.get(`input[id="${input}"]`).parent().click();
  };

  cy.visit('/register/');
  cy.fillInput('username', username);
  cy.fillInput('password', password);
  cy.fillInput('password-confirmation', password);
  cy.fillInput('display-name', 'exampleDisplayName');
  toggle('required-age');
  toggle('privacy-consent');
  cy.get(`button[id="submit"]`).click();
  cy.wait(500);

  cy.switchLanguageBeforeLogin('fi');
  cy.findByText('Kirjaudu sisään', 'h1').should('be.visible');
});

Cypress.Commands.add('loginUser', (username: string, password: string) => {
  cy.visit('/login/');
  cy.fillInput('login_name', username);
  cy.fillInput('password', password);
  cy.get('button[id="submit"]').click();

  cy.switchLanguageAfterLogin('fi');
  cy.findByText('Ylitse MentorApp -vertaismentoripalvelu', 'p').should(
    'be.visible',
  );
});

Cypress.Commands.add('clickLogout', () => {
  cy.get('a[href="/logout"]').click();
});

declare namespace Cypress {
  interface Chainable {
    switchLanguageBeforeLogin(language: LangCode): Chainable<void>;
    switchLanguageAfterLogin(language: LangCode): Chainable<void>;
    fillInput(id: string, value: string): Chainable<void>;
    findByText(text: string, selector?: string): Chainable<void>;
    registerUser(username: string, password: string): Chainable<void>;
    loginUser(username: string, password: string): Chainable<void>;
    clickLogout(): Chainable<void>;
  }
}
