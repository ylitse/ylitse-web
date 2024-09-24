import { v4 as uuidv4 } from 'uuid';

describe('logout', () => {
  const username = `logout-${uuidv4()}`;

  const clickLogout = (): void => {
    cy.get('a[href="/logout"]').click();
  };

  before(() => {
    cy.registerUser(username, 'examplePassword');
  });

  beforeEach(() => {
    cy.visit('/login/');
    cy.switchLanguage('fi');
    cy.loginUser(username, 'examplePassword');
  });

  it('logout redirects user to login page', () => {
    clickLogout();
    cy.url().should('match', /login/);
    cy.contains('Kirjaudu sisään').should('be.visible');
  });

  // FIXME: re-enable when dev server issue is resolved
  xit('logout ends session', () => {
    clickLogout();
    cy.url().should('match', /login/);
    cy.contains('Kirjaudu sisään').should('be.visible');
    cy.visit('/');
    cy.url().should('match', /login/);
    cy.contains('Kirjaudu sisään').should('be.visible');
  });
});
