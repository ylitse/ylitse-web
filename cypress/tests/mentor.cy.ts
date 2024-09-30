import { accounts } from 'cypress/fixtures/accounts';
import { api } from 'cypress/support/api';

describe('mentor profile', () => {
  const mentor = accounts.mentors[0];

  const getTooYoungBirthYear = () => String(new Date().getFullYear() - 16); // Younger than 17

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

  it('password is changed if provided inputs are valid', () => {
    // open password editor
    cy.get('button[id="open-password-editor"]').click();
    cy.getByText('Nykyinen salasana *', 'label').should('be.visible');
    cy.getByText('Uusi salasana *', 'label').should('be.visible');
    cy.getByText('Toista uusi salasana *', 'label').should('be.visible');
    cy.getByText('Näytä salasana', 'button').should('be.visible');
    cy.contains('Salasana on liian lyhyt').should('not.exist');
    cy.contains('Salasanat eivät täsmää').should('not.exist');
    cy.getByText('Tallenna', 'button').should('be.disabled');

    // provide inputs
    cy.fillInputByLabel('Nykyinen salasana *', mentor.password);
    cy.fillInputByLabel('Uusi salasana *', 'newPassword');
    cy.wait(200);
    cy.fillInputByLabel('Toista uusi salasana *', 'newPassword');
    cy.getByText('Tallenna', 'button').click();

    // should show notification
    cy.contains('Salasana päivitetty onnistuneesti').should('be.visible');

    // should not show editor
    cy.getByText('Nykyinen salasana *', 'label').should('not.exist');
    cy.getByText('Uusi salasana *', 'label').should('not.exist');
    cy.getByText('Toista uusi salasana *', 'label').should('not.exist');

    // log out
    cy.getByText('Kirjaudu ulos').click();

    // old password should not work
    cy.fillInput('login_name', mentor.loginName);
    cy.fillInput('password', mentor.password);
    cy.get('button[id="submit"]').click();
    cy.get('[id="login-error"]').should('be.visible');

    // new password should work
    cy.loginUser(mentor.loginName, 'newPassword');
    cy.location('pathname').should('eq', '/');
    cy.contains('Kirjaudu ulos').should('be.visible');
  });

  it('public info is changed if provided inputs are valid', () => {
    cy.fillInputByLabel('Julkinen nimimerkki *', 'uusi');
    cy.getInputByLabel('Syntymävuosi *').type('{selectall}').type('2000');
    cy.getInputByLabel('Alue').clear();
    cy.fillInputByLabel('Tilaviesti', 'Olen käytettävissä');
    cy.getByText('Tallenna', 'button').click();

    // check that values were updated
    cy.reload();
    cy.getInputByLabel('Julkinen nimimerkki *').should('have.value', 'uusi');
    cy.getInputByLabel('Syntymävuosi *').should('have.value', '2000');
    cy.getInputByLabel('Alue').should('not.have.value');
    cy.getInputByLabel('Tilaviesti').should('have.value', 'Olen käytettävissä');
  });

  it('public info changes are discarded after button press', () => {
    cy.fillInputByLabel('Julkinen nimimerkki *', 'uusi');
    cy.getInputByLabel('Syntymävuosi *').type('{selectall}').type('2000');
    cy.getInputByLabel('Alue').clear();
    cy.fillInputByLabel('Tilaviesti', 'Olen käytettävissä');
    cy.getByText('Hylkää muutokset', 'button').click();

    // check that values were discarded
    cy.reload();
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
  });

  it('display name error message is shown for invalid inputs ', () => {
    cy.fillInputByLabel('Julkinen nimimerkki *', 'a');
    cy.wait(200);
    cy.contains('Nimimerkki on liian lyhyt').should('be.visible');
    cy.getByText('Tallenna', 'button').should('be.disabled');
  });

  it('birth year error message is shown for invalid inputs', () => {
    ['0', '1', '1899', getTooYoungBirthYear(), '2100', '9999'].forEach(
      invalidInput => {
        cy.fillInputByLabel('Syntymävuosi *', invalidInput);
        cy.wait(200);
        cy.contains('Syntymävuosi on virheellinen').should('be.visible');
        cy.getByText('Tallenna', 'button').should('be.disabled');
      },
    );
  });
});
