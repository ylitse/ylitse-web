import { accounts } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

describe('mentors search', () => {
  const mentor = accounts.mentors[0];

  beforeEach(() => {
    api.deleteAccounts();
    api.signUpMentor(mentor);
    cy.loginUser(mentor.loginName, mentor.password);
    cy.get('[href="/mentors"]').click();
  });

  after(() => {
    api.deleteAccounts();
  });

  it('displays right content if mentors are not found', () => {
    // assure mentors are first visible when mentors page is opened
    cy.getByText(mentor.displayName, 'h2').should('be.visible');
    cy.contains('Tarinani').should('be.visible');
    cy.contains(mentor.story).should('be.visible');
    cy.contains('Puhun näitä kieliä').should('be.visible');

    // assurre that if mentor list is empty, right content is displayed
    // type a keyword that should not match any mentors
    cy.get('input[placeholder*="Etsi mentoria hakusanalla"]')
      .click()
      .type('this is a really bad keyword');
    cy.getByText('Mentoreita ei löytynyt').should('be.visible');
    cy.getByText('Vinkkejä hakuun').should('be.visible');
  });
});
