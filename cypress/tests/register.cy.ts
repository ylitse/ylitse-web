import { api } from 'cypress/support/api';
import { v4 as uuidv4 } from 'uuid';

describe('register', () => {
  const username = `register-${uuidv4()}`;

  const clear = (input: string): void => {
    cy.get(`input[id="${input}"]`).clear().blur();
  };

  const click = (button: string): void => {
    cy.get(`button[id="${button}"]`).click();
  };

  const toggle = (input: string): void => {
    cy.get(`input[id="${input}"]`).parent().click();
  };

  const fillOutForm = (username: string): void => {
    cy.fillInput('username', username);
    cy.fillInput('password', 'examplePassword');
    cy.fillInput('password-confirmation', 'examplePassword');
    cy.fillInput('display-name', 'exampleDisplayName');
    toggle('required-age');
    toggle('privacy-consent');
  };

  beforeEach(() => {
    cy.visit('/register/');
    cy.switchLanguageBeforeLogin('fi');
    cy.findByText('Rekisteröidy', 'h1').should('be.visible');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('loads page', () => {
    cy.findByText('Rekisteröidy', 'h1').should('be.visible');
    cy.contains('Hienoa, että haluat aloittaa palvelun käytön.').should(
      'be.visible',
    );
  });

  it('changes language on button press', () => {
    cy.switchLanguageBeforeLogin('en');
    cy.findByText('Register', 'h1').should('be.visible');
    cy.switchLanguageBeforeLogin('fi');
    cy.findByText('Rekisteröidy', 'h1').should('be.visible');
  });

  it('registers new user if form is correctly filled', () => {
    cy.registerUser(username, 'examplePassword');
    cy.location('pathname').should('contain', '/login');
    cy.findByText('Kirjaudu sisään', 'h1').should('be.visible');
  });

  // Username

  it('shows error message if username is too short', () => {
    cy.fillInput('username', 'a');
    cy.contains('Käyttäjätunnus on liian lyhyt').should('be.visible');
  });

  it('shows no error message if username is long enough', () => {
    cy.fillInput('username', 'freeUsername');
    cy.contains('Käyttäjätunnus on liian lyhyt').should('not.be.visible');
  });

  it('shows error message if username is taken', () => {
    cy.fillInput('username', username);
    cy.contains('Käyttäjätunnus on jo käytössä').should('be.visible');
  });

  it('shows no error message if username is free', () => {
    cy.fillInput('username', 'freeUsername');
    cy.contains('Käyttäjätunnus on jo käytössä').should('not.be.visible');
  });

  it('prevents registration if username field is empty', () => {
    fillOutForm('freeUsername');
    clear('username');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });

  // Password

  it('hides password as default', () => {
    cy.fillInput('password', 'examplePassword');
    cy.get('input[id="password"]').should('not.contain', 'examplePassword');
  });

  it('shows password after toggle click', () => {
    cy.fillInput('password', 'examplePassword');
    click('show-password');
    cy.get('input[id="password"]').should('have.value', 'examplePassword');
  });

  it('prevents registration if password field is empty', () => {
    fillOutForm('freeUsername');
    clear('password');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });

  // Password confirmation

  it('hides password confirmation as default', () => {
    cy.fillInput('password-confirmation', 'examplePassword');
    cy.get('input[id="password-confirmation"]').should(
      'not.contain',
      'examplePassword',
    );
  });

  it('shows password confirmation after toggle click', () => {
    cy.fillInput('password-confirmation', 'examplePassword');
    click('show-password-confirmation');
    cy.get('input[id="password-confirmation"]').should(
      'have.value',
      'examplePassword',
    );
  });

  it('shows error message if passwords are different', () => {
    cy.fillInput('password', 'examplePassword');
    cy.fillInput('password-confirmation', 'wrongPassword');
    cy.contains('Salasanat eivät täsmää').should('be.visible');
  });

  it('shows no error message if passwords are the same', () => {
    cy.fillInput('password', 'examplePassword');
    cy.fillInput('password-confirmation', 'examplePassword');
    cy.contains('Salasanat eivät täsmää').should('not.be.visible');
  });

  it('shows no error message if different passwords are corrected', () => {
    cy.fillInput('password', 'wrongPassword');
    cy.fillInput('password-confirmation', 'examplePassword');
    clear('password');
    cy.fillInput('password', 'examplePassword');
    cy.contains('Salasanat eivät täsmää').should('not.be.visible');
  });

  it('prevents registration if password confirmation field is empty', () => {
    fillOutForm('freeUsername');
    clear('password-confirmation');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });

  // Email

  it('shows error message if email is invalid', () => {
    cy.fillInput('email', 'wrongEmail');
    cy.contains('Sähköpostiosoite on virheellinen').should('be.visible');
  });

  it('shows no error message if email is valid', () => {
    cy.fillInput('email', 'firstname.lastname@example.com');
    cy.contains('Sähköpostiosoite on virheellinen').should('not.be.visible');
  });

  // Display name

  it('shows error message if display name is too short', () => {
    cy.fillInput('display-name', 'a');
    cy.contains('Nimimerkki on liian lyhyt').should('be.visible');
  });

  it('shows no error message if display name is long enough', () => {
    cy.fillInput('display-name', 'exampleDisplayName');
    cy.contains('Nimimerkki on liian lyhyt').should('not.be.visible');
  });

  it('prevents registration if display name field is empty', () => {
    fillOutForm('freeUsername');
    clear('display-name');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });

  // Required age

  it('prevents registration if required age toggle is off', () => {
    fillOutForm('freeUsername');
    toggle('required-age');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });

  // Privacy consent

  it('prevents registration if privacy consent toggle is off', () => {
    fillOutForm('freeUsername');
    toggle('privacy-consent');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });
});
