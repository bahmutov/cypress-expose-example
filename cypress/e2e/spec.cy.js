/// <reference types="cypress" />

describe('Expose variables', () => {
  it('has Cypress.expose values', () => {
    expect(Cypress.expose('answer'), 'exposed answer').to.equal(42)
  })

  it('has all expected exposed values', () => {
    expect(Cypress.expose(), 'keys').to.have.all.keys(
      'answer',
      'USER_NAME',
    )
  })

  it('has cy.env values', () => {
    cy.env(['API_KEY']).should('deep.equal', {
      API_KEY: '123secret!',
    })
  })

  it('has all secret keys', () => {
    cy.env(['API_KEY', 'PASS_WORD']).should('have.all.keys', [
      'API_KEY',
      'PASS_WORD',
    ])
  })
})
