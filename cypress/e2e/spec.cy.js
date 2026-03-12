/// <reference types="cypress" />

describe('Expose variables', () => {
  it('has Cypress.expose values', () => {
    // note that the value is cast as a number
    expect(Cypress.expose('answer'), 'exposed answer').to.equal(42)
  })

  it('has all expected exposed values', () => {
    const exposedKeys = Object.keys(Cypress.expose())
    expect(exposedKeys, 'keys')
      .to.have.length(2)
      .and.include('answer')
    // the "userName" could also be "USER_NAME"
    expect(exposedKeys, 'username').to.satisfy(
      (keys) =>
        keys.includes('userName') || keys.includes('USER_NAME'),
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

  it('deletes the exposed variables from cy.env', () => {
    cy.env(['answer']).should('deep.equal', {})
    // another secret value remains
    cy.env(['API_KEY']).should('deep.equal', {
      API_KEY: '123secret!',
    })
  })
})
