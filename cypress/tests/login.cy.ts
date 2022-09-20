describe('login', () => {
  const testErrorVisible = () => {
    cy.contains('Käyttäjätunnus tai salasanasi on virheellinen.').should(
      'be.visible',
    );
    cy.contains('Tarkista syöttämäsi tiedot.').should('be.visible');
  };

  const clickLogin = () => {
    cy.get('form > .button').click();
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('contains buttons', () => {
    cy.contains('Rekisteröidy');
    cy.contains('Kirjaudu');
  });

  it('has right content', () => {
    cy.contains('Kirjaudu sisään');
    cy.contains(
      'Uusi täällä? Palvelussa voit jutella SOS-Lapsikylän valmentamien vertaismentoreiden kanssa mistä tahansa mieltäsi painavasta asiasta. Palvelun käyttö on luottamuksellista ja täysin maksutonta.',
    );
    cy.contains('Ylitse MentorApp');
    cy.contains('Unohditko salasanasi?');
  });

  it('shows error if empty username', () => {
    cy.fillInput('password', 'examplePassword');
    clickLogin();
    testErrorVisible();
  });

  it('shows error if empty password', () => {
    cy.fillInput('username', 'exampleUsername');
    clickLogin();
    testErrorVisible();
  });

  it('shows error if no account exists', () => {
    cy.fillInput('username', 'wrongUsername');
    cy.fillInput('password', 'wrongPassword');
    clickLogin();
    testErrorVisible();
  });

  it('can log in with registered account', () => {
    cy.registerUser('exampleUsername', 'examplePassword');
    cy.location('pathname').should('contain', '/login');
    cy.fillInput('username', 'exampleUsername');
    cy.fillInput('password', 'examplePassword');
    clickLogin();
    cy.location('pathname').should('eq', '/');
  });
});
