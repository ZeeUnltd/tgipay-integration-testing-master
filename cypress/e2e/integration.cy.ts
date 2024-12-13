describe('Index Page', () => {
  beforeEach(() => {
      cy.visit('/');
  });

  it('should display the product grid', () => {
      cy.get('[data-cy=index-page]').should('exist');
      cy.get('[data-cy=product-grid]').should('exist');
      cy.get('[data-cy=product]').should('have.length.greaterThan', 0);
  });

  it('should display product details', () => {
      cy.get('[data-cy=product]').first().within(() => {
          cy.get('[data-cy=product-image]').should('be.visible');
          cy.get('[data-cy=product-name]').should('not.be.empty');
          cy.get('[data-cy=product-price]').should('contain', 'Price');
      });
  });

  it('should trigger payment flow on clicking "Pay"', () => {
      cy.get('[data-cy=product]').first().within(() => {
          cy.get('[data-cy=pay-button]').click();
      });

      // Assuming FullscreenLoader is shown during the payment process
      cy.get('[data-cy=fullscreen-loader]').should('be.visible');
  });
});
