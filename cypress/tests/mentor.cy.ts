import { accounts } from 'cypress/fixtures/accounts';
import { api } from 'cypress/support/api';

describe('mentor profile', () => {
  const mentor = accounts.mentors[0];

  beforeEach(() => {
    api.deleteAccounts();
    api.signUpMentor(mentor);
    cy.loginUser(mentor.loginName, mentor.password);
    cy.visit('/profile');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('displays right content on profile page', () => {
    cy.getByText('Profiili', 'h1').should('be.visible');
    cy.getByText('Tilin tiedot', 'h2').should('be.visible');
    cy.getByText('Mentori', 'p').should('be.visible');
    cy.getByText(mentor.loginName, 'p').should('be.visible');
    cy.getByText(mentor.email, 'p').should('be.visible');

    cy.getByText('Julkiset tiedot', 'h2').should('be.visible');
    cy.getInputByLabel('Julkinen nimimerkki *').should(
      'have.value',
      mentor.displayName,
    );
    cy.getInputByLabel('Syntymävuosi *').should(
      'have.value',
      String(mentor.birthYear),
    );
    cy.getInputByLabel('Alue').should('have.value', mentor.region);
    cy.getInputByLabel('Tilaviesti').should(
      'have.value',
      mentor.status_message,
    );
    cy.getByText('Tavoitettavissa', 'label').should('be.visible');
    cy.get('textarea').should('have.value', mentor.story);
  });

  // it('password is changed if provided inputs are valid', () => {});

  // it('public info is changed if provided inputs are valid', () => {});

  // it('public info changes are discarded after button press', () => {});

  // it('display name error message is shown for invalid inputs ', () => {});

  // it('birth year error message is shown for invalid inputs', () => {});
});
