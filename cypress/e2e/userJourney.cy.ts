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

  it('verify alert cards', () => {
    cy.get('[data-testid="alertCard2"]').contains(
      'Alert Card ( Not filled, content variations displayed )');
    cy.get('[data-testid="alertCard3"]').contains(
      'Alert Card ( Border colored to most significant warning level. )'
    );
    cy.get('[data-testid="alertCard4"]').contains(
      'Alert Card ( Not filled, with contents filled / values shown. Levels 2 - 4 coloured as Warnings )'
    );
    cy.get('[data-testid="cardId"]').contains('English');
    cy.get('[data-testid="cardId"]').contains('SKA LOW');
    cy.get('[data-testid="cardId"]').contains('I am in ENGLISH translation file only');
    cy.get('[data-testid="textId"]').should('exist');
    cy.get('[data-testid="numberId"]').should('exist');
  });
});
