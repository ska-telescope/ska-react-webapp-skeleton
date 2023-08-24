context('Testing react skeleton', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8090/');
  });
  it('verify header', () => {
    cy.get('h4').contains('SKA REACT SKELETON');
    cy.get('[data-testid="Brightness7Icon"]').click();
    cy.get('[aria-label="skaWebsite"]').click();
  });

  it('verify footer', () => {
    cy.get('button').contains('SKA LOW');
    cy.get('button').contains('SKA MID');
  });

  it('verify alert card', () => {
    cy.get('[data-testid="cardId"]').contains('English');
    cy.get('[data-testid="cardId"]').contains('SKA LOW');
    cy.get('[data-testid="cardId"]').contains('I am in ENGLISH translation file only');
    cy.get('[data-testid="textId"]').should('exist');
    cy.get('[data-testid="numberId"]').should('exist');
  });
});
