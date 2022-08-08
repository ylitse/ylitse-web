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

  it('contains buttons', () => {
    cy.visit('/login');
    cy.contains('Rekisteröidy');
    cy.contains('Kirjaudu');
  });
  it('has right content', () => {
    cy.visit('/login');
    cy.contains('Kirjaudu sisään');
    cy.contains(
      'Uusi täällä? Palvelussa voit jutella SOS-Lapsikylän valmentamien vertaismentoreiden kanssa mistä tahansa mieltäsi painavasta asiasta. Palvelun käyttö on luottamuksellista ja täysin maksutonta.',
    );
    cy.contains('Ylitse MentorApp');
    cy.contains('Unohditko salasanasi?');
  });
  it('shows error if empty username', () => {
    cy.visit('/login');
    cy.get('[name="password"]').type('passwordd');
    clickLogin();
    testErrorVisible();
  });
  it('shows error if empty password', () => {
    cy.visit('/login');
    cy.get('[name="username"]').type('usernameTest');
    clickLogin();
    testErrorVisible();
  });
  it('shows error if bad username and password', () => {
    cy.visit('/login');
    cy.get('[name="username"]').type(' bad userName');
    cy.get('[name="password"]').type('bad password');
    clickLogin();
    testErrorVisible();
  });
});
