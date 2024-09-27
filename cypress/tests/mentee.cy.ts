import { accounts } from 'cypress/fixtures/accounts';
import { api } from 'cypress/support/api';

describe('mentee profile', () => {
  const mentee = accounts.mentees[0];

  beforeEach(() => {
    api.deleteAccounts();
    api.signUpMentee(mentee);
    cy.loginUser(mentee.loginName, mentee.password);
    cy.visit('/profile');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('displays right content on profile page', () => {
    cy.getByText('Profiili', 'h1').should('be.visible');
    cy.getByText('Tilin tiedot', 'h2').should('be.visible');
    cy.getByText('Käyttäjä', 'p').should('be.visible');
    cy.getByText(mentee.loginName, 'p').should('be.visible');
    cy.getByText(mentee.email, 'p').should('be.visible');

    cy.getByText('Julkiset tiedot', 'h2').should('be.visible');
    cy.getByText(mentee.displayName, 'p').should('be.visible');
  });

  // it('password is changed if provided inputs are valid', () => {});

  // it('correct password error messages and notifications are shown for invalid inputs', () => {});

  // it('email is changed if provided input is valid', () => {});

  // it('email error message is shown for invalid inputs', () => {});

  // it('display name is changed if provided input is valid', () => {});

  // it('display name error message is shown for invalid inputs', () => {});

  // it('account is deleted after confirmation', () => {});
});
