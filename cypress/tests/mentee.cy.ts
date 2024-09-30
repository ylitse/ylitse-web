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
    cy.fillInputByLabel('Nykyinen salasana *', mentee.password);
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
    cy.fillInput('login_name', mentee.loginName);
    cy.fillInput('password', mentee.password);
    cy.get('button[id="submit"]').click();
    cy.get('[id="login-error"]').should('be.visible');

    // new password should work
    cy.loginUser(mentee.loginName, 'newPassword');
    cy.location('pathname').should('eq', '/');
    cy.contains('Kirjaudu ulos').should('be.visible');
  });

  it('correct password error messages and notifications are shown for invalid inputs', () => {
    // open password editor
    cy.get('button[id="open-password-editor"]').click();

    // provide too short a password
    cy.fillInputByLabel('Uusi salasana *', 'short');
    // cy.wait(200);
    cy.contains('Salasana on liian lyhyt').should('be.visible');

    // provide unmatching new passwords
    cy.fillInputByLabel('Uusi salasana *', 'LongEnough');
    cy.fillInputByLabel('Toista uusi salasana *', 'notAMatch');
    cy.contains('Salasanat eivät täsmää').should('be.visible');

    // provide invalid current password
    cy.fillInputByLabel('Nykyinen salasana *', 'WRONG');
    cy.fillInputByLabel('Uusi salasana *', 'LongEnough');
    cy.fillInputByLabel('Toista uusi salasana *', 'LongEnough');
    cy.getByText('Tallenna', 'button').click();
    cy.contains('Salasanan päivitys epäonnistui').should('be.visible');

    // old password should still work
    cy.getByText('Kirjaudu ulos').click();
    cy.loginUser(mentee.loginName, mentee.password);
    cy.location('pathname').should('eq', '/');
    cy.contains('Kirjaudu ulos').should('be.visible');
  });

  it('email is changed if provided input is valid', () => {
    // open email editor
    cy.get('button[id="open-email-editor"]').click();
    cy.getByText('Tallenna', 'button').should('be.disabled');
    cy.fillInputByLabel('Sähköpostiosoite', 'esimerkki.esimerkki@esim.fi');

    // should not show error for valid input
    cy.contains('Sähköpostiosoite on virheellinen').should('not.exist');
    cy.getByText('Tallenna', 'button').click();

    // should show notification
    cy.contains('Profiili päivitetty onnistuneesti').should('be.visible');
    cy.contains('esimerkki.esimerkki@esim.fi').should('be.visible');
  });

  it('email error message is shown for invalid inputs', () => {
    // open email editor
    cy.get('button[id="open-email-editor"]').click();

    // try invalid inputs
    [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      'あいうえお@example.com',
      'email@example.com (Joe Smith)',
      'email@example',
      'email@111.222.333.44444',
      'a',
      `${'x'.repeat(400)}@example.org`,
    ].forEach(invalidEmail => {
      cy.fillInputByLabel('Sähköpostiosoite', invalidEmail);
      cy.wait(200);
      cy.contains('Sähköpostiosoite on virheellinen').should('be.visible');
      cy.getByText('Tallenna', 'button').should('be.disabled');
    });
  });

  it('display name is changed if provided input is valid', () => {
    // open display name editor
    cy.get('button[id="open-display-name-editor"]').click();
    cy.getByText('Tallenna', 'button').should('be.disabled');
    cy.fillInputByLabel('Julkinen nimimerkki', 'esimerkki');

    // should not show error for valid input
    cy.contains('Nimimerkki on liian lyhyt').should('not.exist');
    cy.getByText('Tallenna', 'button').click();

    // should show notification
    cy.contains('Profiili päivitetty onnistuneesti').should('be.visible');
    cy.contains('esimerkki').should('be.visible');
  });

  it('display name error message is shown for invalid input', () => {
    cy.get('button[id="open-display-name-editor"]').click();

    // try invalid input
    cy.fillInputByLabel('Julkinen nimimerkki', 'a');
    cy.wait(200);
    cy.contains('Nimimerkki on liian lyhyt').should('be.visible');
    cy.getByText('Tallenna', 'button').should('be.disabled');
  });

  it('account is deleted after confirmation', () => {
    cy.getByText('Poista käyttäjätili', 'button').click();
    cy.getByText(
      'Käyttäjätilin poistamista ei voi tämän jälkeen perua. Kaikki käyttäjätilin keskustelut poistetaan.',
      'p',
    ).should('be.visible');
    cy.getByText('Poista', 'button').click();

    // should log out automatically
    cy.location('pathname').should('eq', '/login/');

    // logging in should not be possible anymore
    cy.fillInput('login_name', mentee.loginName);
    cy.fillInput('password', mentee.password);
    cy.get('button[id="submit"]').click();
    cy.get('[id="login-error"]').should('be.visible');
  });
});
