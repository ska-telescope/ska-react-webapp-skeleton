context('Testing react skeleton', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8090/')
  })
  it('verify header', () => {
    cy.get('[id=headerItem1]').contains('THIS').should('be.visible')
    cy.get('[id=headerItem2]').contains('IS').should('be.visible')
    cy.get('[id=headerItem3]').contains('THE').should('be.visible')
    cy.get('[id=headerItem4]').contains('HEADER').should('be.visible')
    cy.get('[data-testid="Brightness7Icon"]').click()
    cy.get('[aria-label="skaWebsite"]').click()

  })

  it('verify footer', () => {
    cy.get('[id=footerItem1]').contains('THIS').should('be.visible')
    cy.get('[id=footerItem2]').contains('IS').should('be.visible')
    cy.get('[id=footerItem3]').contains('THE').should('be.visible')
    cy.get('[id=footerItem4]').contains('FOOTER').should('be.visible')
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