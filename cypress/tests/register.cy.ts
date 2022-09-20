describe('register', () => {
  const fill = (input: string, value: string): void => {
    cy.get(`input[id="${input}"]`).type(value).blur();
  };

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
    fill('username', username);
    fill('password', 'examplePassword');
    fill('password-confirmation', 'examplePassword');
    fill('display-name', 'exampleDisplayName');
    toggle('required-age');
    toggle('privacy-consent');
  };

  beforeEach(() => cy.visit('/register'));

  it('loads page', () => {
    cy.contains('Rekisteröidy');
    cy.contains('Hienoa, että haluat aloittaa palvelun käytön.');
  });

  it('registers new user if form is correctly filled', () => {
    cy.registerUser('takenUsername', 'examplePassword');
    cy.url().should('contain', '/login');
  });

  // Username

  it('shows error message if username is too short', () => {
    fill('username', 'a');
    cy.contains('Käyttäjätunnus on liian lyhyt').should('be.visible');
  });

  it('shows no error message if username is long enough', () => {
    fill('username', 'freeUsername');
    cy.contains('Käyttäjätunnus on liian lyhyt').should('not.be.visible');
  });

  it('shows error message if username is taken', () => {
    fill('username', 'takenUsername');
    cy.contains('Käyttäjätunnus on jo käytössä').should('be.visible');
  });

  it('shows no error message if username is free', () => {
    fill('username', 'freeUsername');
    cy.contains('Käyttäjätunnus on jo käytössä').should('not.be.visible');
  });

  it('prevents registration if username field is empty', () => {
    fillOutForm('freeUsername');
    clear('username');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });

  // Password

  it('hides password as default', () => {
    fill('password', 'examplePassword');
    cy.get('input[id="password"]').should('not.contain', 'examplePassword');
  });

  it('shows password after toggle click', () => {
    fill('password', 'examplePassword');
    click('password-toggle');
    cy.get('input[id="password"]').should('have.value', 'examplePassword');
  });

  it('prevents registration if password field is empty', () => {
    fillOutForm('freeUsername');
    clear('password');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });

  // Password confirmation

  it('hides password confirmation as default', () => {
    fill('password-confirmation', 'examplePassword');
    cy.get('input[id="password-confirmation"]').should(
      'not.contain',
      'examplePassword',
    );
  });

  it('shows password confirmation after toggle click', () => {
    fill('password-confirmation', 'examplePassword');
    click('password-confirmation-toggle');
    cy.get('input[id="password-confirmation"]').should(
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
    fill('password', 'wrongPassword');
    fill('password-confirmation', 'examplePassword');
    clear('password');
    fill('password', 'examplePassword');
    cy.contains('Salasanat eivät täsmää').should('not.be.visible');
  });

  it('prevents registration if password confirmation field is empty', () => {
    fillOutForm('freeUsername');
    clear('password-confirmation');
    cy.get('button[id="submit"]').should(`be.disabled`);
  });

  // Email

  it('shows error message if email is invalid', () => {
    fill('email', 'wrongEmail');
    cy.contains('Sähköpostiosoite on virheellinen').should('be.visible');
  });

  it('shows no error message if email is valid', () => {
    fill('email', 'firstname.lastname@example.com');
    cy.contains('Sähköpostiosoite on virheellinen').should('not.be.visible');
  });

  // Display name

  it('shows error message if display name is too short', () => {
    fill('display-name', 'a');
    cy.contains('Nimimerkki on liian lyhyt').should('be.visible');
  });

  it('shows no error message if display name is long enough', () => {
    fill('display-name', 'exampleDisplayName');
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
