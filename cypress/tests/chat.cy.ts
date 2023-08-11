describe('chat', () => {
  before(() => {
    cy.createMentor('chatTestMentor');
    cy.registerUser('chatTestUsername', 'examplePassword');
  });

  beforeEach(() => {
    cy.loginUser('chatTestUsername', 'examplePassword');
    cy.visit('/chat');
  });
});
