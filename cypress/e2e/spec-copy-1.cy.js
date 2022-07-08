
// describe('My First Test', () => {
//   it('Does not do much!', () => {
//     cy.visit('https://www.google.com/.com')
//     cy.title().should('eq','Google')  })
// })

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })

  it('TestCase2', () => {
    cy.visit('https://www.google.com/')     
  })
})

