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
    cy.get('input[id="password"]').type('password');
    clickLogin();
    testErrorVisible();
  });

  it('shows error if empty password', () => {
    cy.get('input[id="username"]').type('username');
    clickLogin();
    testErrorVisible();
  });

  it('shows error if no account exists', () => {
    cy.get('input[id="username"]').type('wrongUsername');
    cy.get('input[id="password"]').type('wrongPassword');
    clickLogin();
    testErrorVisible();
  });

  it('can log in with registered account', () => {
    cy.registerUser('username', 'password');
    cy.location('pathname').should('contain', '/login');
    cy.get('input[id="username"]').focus().type('username');
    cy.get('input[id="password"]').focus().type('password');
    clickLogin();
    cy.location('pathname').should('eq', '/');
  });
});
