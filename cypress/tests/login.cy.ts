import { api } from 'cypress/support/api';
import { v4 as uuidv4 } from 'uuid';

describe('login', () => {
  const username = `login-${uuidv4()}`;

  const testErrorVisible = () => {
    cy.get('[id="login-error"]').should('be.visible');
  };

  const clickLogin = (): void => {
    cy.get('button[id="submit"]').click();
  };

  before(() => {
    cy.registerUser(username, 'examplePassword');
  });

  beforeEach(() => {
    cy.visit('/login/');
    cy.switchLanguage('fi');
    cy.contains('Kirjaudu').should('be.visible');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('contains buttons', () => {
    cy.contains('Rekisteröidy').should('be.visible');
    cy.contains('Kirjaudu').should('be.visible');
  });

  it('has right content', () => {
    cy.contains('Kirjaudu sisään').should('be.visible');
    cy.contains(
      'Uusi täällä? Palvelussa voit jutella SOS-Lapsikylän valmentamien vertaismentoreiden kanssa mistä tahansa mieltäsi painavasta asiasta. Palvelun käyttö on luottamuksellista ja täysin maksutonta.',
    ).should('be.visible');
    cy.contains('Ylitse MentorApp').should('be.visible');
    cy.contains('Unohditko salasanasi?').should('be.visible');
  });

  it('changes language on button press', () => {
    cy.switchLanguage('en');
    cy.contains('Login').should('be.visible');
    cy.switchLanguage('fi');
    cy.contains('Kirjaudu sisään').should('be.visible');
  });

  it('shows error if empty login_name', () => {
    cy.fillInput('password', 'examplePassword');
    clickLogin();
    testErrorVisible();
  });

  it('shows error if empty password', () => {
    cy.fillInput('login_name', 'exampleUsername');
    clickLogin();
    testErrorVisible();
  });

  it('shows error if no account exists', () => {
    cy.fillInput('login_name', 'wrongUsername');
    cy.fillInput('password', 'wrongPassword');
    clickLogin();
    testErrorVisible();
  });

  it('can log in and out with registered account', () => {
    cy.fillInput('login_name', username);
    cy.fillInput('password', 'examplePassword');
    clickLogin();
    cy.location('pathname').should('eq', '/');
    cy.contains('Kirjaudu ulos').should('be.visible');
  });
});
