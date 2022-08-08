describe('register', () => {
  const addUsername = () =>
    cy.get('input[name="username"]').type('exampleUsername');
  const addPassword = () =>
    cy.get('input[name="password"]').type('examplePassword');
  const addScreenName = () =>
    cy.get('input[name="screen-name"]').type('exampleScreenName');
  const checkRequiredAge = () =>
    cy.get('input[id="required-age"]').parent().click();
  const checkPrivacyConsent = () =>
    cy.get('input[id="privacy-consent"]').parent().click();

  const fillOutForm = () => {
    addUsername();
    addPassword();
    addScreenName();
    checkRequiredAge();
    checkPrivacyConsent();
  };

  const submitShouldBeDisabled = () =>
    cy.get('button[id="submit-button').should('be.disabled');

  const clickSubmit = () => cy.get('button[id="submit-button').click();

  beforeEach(() => {
    cy.visit('/register');
  });

  it('loads page', () => {
    cy.contains('Rekisteröidy');
    cy.contains('Hienoa, että haluat aloittaa palvelun käytön.');
  });

  it('hides password as default', () => {
    addPassword();
    cy.get('input[name="password"]').should('not.contain', 'examplePassword');
  });

  it('shows password after toggle click', () => {
    addPassword();
    cy.get('button[id="password-toggle"]').click();
    cy.get('input[name="password"]').should('have.value', 'examplePassword');
  });

  it('shows error message if invalid email', () => {
    cy.get('input[name="email"]').type('email').blur();
    cy.contains('Sähköpostiosoite on virheellinen').should('be.visible');
  });

  it('shows no error message if valid email', () => {
    cy.get('input[name="email"]').type('firstname.lastname@example.com').blur();
    cy.contains('Sähköpostiosoite on virheellinen').should('not.be.visible');
  });

  it('prevents registration if username field is empty', () => {
    addPassword();
    addScreenName();
    checkRequiredAge();
    checkPrivacyConsent();
    submitShouldBeDisabled();
  });

  it('prevents registration if password field is empty', () => {
    addUsername();
    addScreenName();
    checkRequiredAge();
    checkPrivacyConsent();
    submitShouldBeDisabled();
  });

  it('prevents registration if screen name field is empty', () => {
    addUsername();
    addPassword();
    checkRequiredAge();
    checkPrivacyConsent();
    submitShouldBeDisabled();
  });

  it('prevents registration if required age toggle is off', () => {
    addUsername();
    addPassword();
    addScreenName();
    checkPrivacyConsent();
    submitShouldBeDisabled();
  });

  it('prevents registration if privacy consent toggle is off', () => {
    addUsername();
    addPassword();
    addScreenName();
    checkRequiredAge();
    submitShouldBeDisabled();
  });

  it('allows registration if all fields are filled', () => {
    fillOutForm();
    clickSubmit();
    cy.url().should('contain', '/login');
  });

  it('prevents registration if field is emptied', () => {
    fillOutForm();
    cy.get('input[name="username"]').clear();
    clickSubmit();
    cy.url().should('contain', '/register');
  });
});
