context('Testing react skeleton', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8090/')
  })
  it('verify header', () => {
    cy.get('[id=headerItem1]').should('include.text', 'THIS')
    cy.get('[id=headerItem2]').should('include.text','IS')
    cy.get('[id=headerItem3]').should('include.text','THE')
    cy.get('[id=headerItem4]').should('include.text','HEADER')
    cy.get('[data-testid="Brightness7Icon"]').click()
    cy.get('[aria-label="skaWebsite"]').click()

  })

  it('verify footer', () => {
    cy.get('[id=footerItem1]').should('include.text', 'THIS')
    cy.get('[id=footerItem2]').should('include.text','IS')
    cy.get('[id=footerItem3]').should('include.text','THE')
    cy.get('[id=footerItem4]').should('include.text','FOOTER')
  })

  it('verify alert card', () => {
    cy.contains('AlertCard Title').should('be.visible')
    cy.contains('Level 0').should('be.visible')
    cy.contains('Level 1').should('be.visible')
    cy.contains('Level 2').should('be.visible')
    cy.contains('Level 3').should('be.visible')
    cy.contains('Level 4').should('be.visible')
    cy.contains('Level 5').should('be.visible')
    cy.contains('Level 6').should('be.visible')

  })
})