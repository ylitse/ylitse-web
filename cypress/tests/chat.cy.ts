describe('chat', () => {
  before(() => {
    cy.registerUser('chatTestUsername', 'examplePassword');
  });

  beforeEach(() => {
    cy.loginUser('chatTestUsername', 'examplePassword');
    cy.visit('/chat');
  });
});
