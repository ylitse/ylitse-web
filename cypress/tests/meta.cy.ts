describe('Meta', () => {
  it('should contain right title', () => {
    cy.visit('/');
    cy.title().should('eq', 'Ylitse MentorApp - SOS-Lapsikylä');
  });
});
