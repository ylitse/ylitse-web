describe('logout', () => {
  const clickLogout = (): void => {
    cy.get('a[id="logout-link"]').click();
  };

  before(() => {
    cy.registerUser('logoutTestUsername', 'examplePassword');
  });

  beforeEach(() => {
    cy.loginUser('logoutTestUsername', 'examplePassword');
  });

  it('logout redirects user to login page', () => {
    clickLogout();
    cy.location('pathname').should('contain', '/login');
  });

  it('logout ends session', () => {
    clickLogout();
    cy.visit('/');
    cy.location('pathname').should('contain', '/login');
  });
});
