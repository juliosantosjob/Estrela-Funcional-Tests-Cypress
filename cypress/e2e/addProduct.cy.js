describe('Products scenarios', () => {
    const email = Cypress.env('email');
    const passwd = Cypress.env('passwd');
    let pants;
    
    beforeEach(() => {
        cy.login(email, passwd);
    });

    it('adding product to cart', () => {
        cy.intercept('**/plugins/customer_chat/SDK/**').as('customerChat');
        cy.wait('@customerChat');

        cy.get('[class="el-search-autocomplete__wrapper"]').click();
        cy.fixture('itens').then((iten) => {
            pants = iten.product.toLowerCase();

            cy.get('.bf-search__field').type(pants).type('{enter}');
            cy.get('[class="bf-shelf-item__container"]').first().then(item => {
                cy.wrap(item).should('contain', pants);
                cy.wrap(item).click();
            });

            cy.contains('Comprar').click();
            cy.get('.bf-buy__button').click({ force: true });

            cy.get('.swal2-confirm').click();
            cy.get('#cart-title').should('have.text', 'Meu Carrinho');

            cy.get('table[class="table cart-items"]')
                .should('be.visible')
                .and('contain', pants);
        });
    });

    it('remove product to cart', () => {
        cy.addToCart('calça');
        cy.get('a[title="remover"]').last().click();

        cy.get('.empty-cart-title')
            .should('be.visible')
            .and('contain', 'Seu carrinho está vazio.');
    });
});
