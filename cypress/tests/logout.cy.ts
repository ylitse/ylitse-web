import { api } from 'cypress/support/api';
import { v4 as uuidv4 } from 'uuid';

describe('logout', () => {
  const username = `logout-${uuidv4()}`;

  before(() => {
    cy.registerUser(username, 'examplePassword');
  });

  beforeEach(() => {
    cy.loginUser(username, 'examplePassword');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('logout redirects user to login page', () => {
    cy.clickLogout();
    cy.url().should('match', /login/);
    cy.switchLanguageBeforeLogin('fi');
    cy.findByText('Kirjaudu sisään', 'h1').should('be.visible');
  });

  // FIXME: re-enable when dev server issue is resolved
  xit('logout ends session', () => {
    cy.clickLogout();
    cy.url().should('match', /login/);
    cy.switchLanguageBeforeLogin('fi');
    cy.findByText('Kirjaudu sisään', 'h1').should('be.visible');

    cy.visit('/');
    cy.url().should('match', /login/);
    cy.switchLanguageBeforeLogin('fi');
    cy.findByText('Kirjaudu sisään', 'h1').should('be.visible');
  });
});
