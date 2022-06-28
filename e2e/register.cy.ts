describe('register', () => {
  it('passes', () => {
    cy.visit('/register')
    cy.contains('Rekisteröidy')
  })
})