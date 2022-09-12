describe('register', () => {
  const fill = (field: string, value: string) => {
    cy.get(`input[name="${field}"]`).type(value).blur();
    if (field === 'username') {
      // Wait for API response
      cy.intercept('/api/search').as('usernameCheck');
      cy.wait('@usernameCheck');
    }
  };

  const clear = (field: string) =>
    cy.get(`input[name="${field}"]`).clear().blur();

  const click = (field: string) => cy.get(`button[id="${field}"]`).click();

  const toggle = (field: string) =>
    cy.get(`input[id="${field}"]`).parent().click();

  const fillOutForm = () => {
    fill('username', 'freeUsername');
    fill('password', 'examplePassword');
    fill('password-confirmation', 'examplePassword');
    fill('display-name', 'exampleDisplayName');
    toggle('required-age');
    toggle('privacy-consent');
  };

  const submitShouldBe = buttonState =>
    cy.get('button[id="submit"]').should(`be.${buttonState}`);

  beforeEach(() => {
    cy.visit('/register');
  });

  it('loads page', () => {
    cy.contains('Rekisteröidy');
    cy.contains('Hienoa, että haluat aloittaa palvelun käytön.');
  });

  it('shows error message if username is too short', () => {
    fill('username', 'a');
    cy.contains('Käyttäjätunnus on liian lyhyt').should('be.visible');
  });

  it('shows error message if username is taken', () => {
    fill('username', 'takenUsername');
    cy.contains('Käyttäjätunnus on jo käytössä').should('be.visible');
  });

  it('shows no error message if username is long enough', () => {
    fill('username', 'freeUsername');
    cy.contains('Käyttäjätunnus on liian lyhyt').should('not.be.visible');
  });

  it('shows no error message if username is free', () => {
    fill('username', 'freeUsername');
    cy.contains('Käyttäjätunnus on jo käytössä').should('not.be.visible');
  });

  it('hides password as default', () => {
    fill('password', 'examplePassword');
    cy.get('input[name="password"]').should('not.contain', 'examplePassword');
  });

  it('shows password after toggle click', () => {
    fill('password', 'examplePassword');
    click('password-toggle');
    cy.get('input[name="password"]').should('have.value', 'examplePassword');
  });

  it('hides password confirmation as default', () => {
    fill('password-confirmation', 'examplePassword');
    cy.get('input[name="password-confirmation"]').should(
      'not.contain',
      'examplePassword',
    );
  });

  it('shows password confirmation after toggle click', () => {
    fill('password-confirmation', 'examplePassword');
    click('password-confirmation-toggle');
    cy.get('input[name="password-confirmation"]').should(
      'have.value',
      'examplePassword',
    );
  });

  it('shows error message if passwords are different', () => {
    fill('password', 'examplePassword');
    fill('password-confirmation', 'wrongPassword');
    cy.contains('Salasanat eivät täsmää').should('be.visible');
  });

  it('shows no error message if passwords are the same', () => {
    fill('password', 'examplePassword');
    fill('password-confirmation', 'examplePassword');
    cy.contains('Salasanat eivät täsmää').should('not.be.visible');
  });

  it('shows no error message if different passwords are corrected', () => {
    fill('password', 'examplePassword');
    fill('password-confirmation', 'wrongPassword');
    clear('password-confirmation');
    fill('password-confirmation', 'examplePassword');
    cy.contains('Salasanat eivät täsmää').should('not.be.visible');
  });

  it('shows error message if email is invalid', () => {
    fill('email', 'wrongEmail');
    cy.contains('Sähköpostiosoite on virheellinen').should('be.visible');
  });

  it('shows no error message if email is valid', () => {
    fill('email', 'firstname.lastname@example.com');
    cy.contains('Sähköpostiosoite on virheellinen').should('not.be.visible');
  });

  it('shows no error message if invalid email is corrected', () => {
    fill('email', 'wrongEmail');
    clear('email');
    fill('email', 'firstname.lastname@example.com');
    cy.contains('Sähköpostiosoite on virheellinen').should('not.be.visible');
  });

  it('shows error message if display name is too short', () => {
    fill('display-name', 'a');
    cy.contains('Nimimerkki on liian lyhyt').should('be.visible');
  });

  it('shows no error message if display name is long enough', () => {
    fill('display-name', 'exampleDisplayName');
    cy.contains('Nimimerkki on liian lyhyt').should('not.be.visible');
  });

  it('prevents registration if username field is empty', () => {
    fillOutForm();
    clear('username');
    submitShouldBe('disabled');
  });

  it('prevents registration if password field is empty', () => {
    fillOutForm();
    clear('password');
    submitShouldBe('disabled');
  });

  it('prevents registration if password confirmation field is empty', () => {
    fillOutForm();
    clear('password-confirmation');
    submitShouldBe('disabled');
  });

  it('prevents registration if display name field is empty', () => {
    fillOutForm();
    clear('display-name');
    submitShouldBe('disabled');
  });

  it('prevents registration if required age toggle is off', () => {
    fillOutForm();
    toggle('required-age');
    submitShouldBe('disabled');
  });

  it('prevents registration if privacy consent toggle is off', () => {
    fillOutForm();
    toggle('privacy-consent');
    submitShouldBe('disabled');
  });

  it('allows registration if all fields are correctly filled', () => {
    fillOutForm();
    submitShouldBe('enabled');
  });
});
