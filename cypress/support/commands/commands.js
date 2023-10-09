Cypress.Commands.add('login', (email, passwd) => {
    cy.intercept('**/api/events').as('user');
    cy.intercept('**/recaptcha/api2/**').as('recaptcha');

    cy.get('#bf-js-login').click();
    cy.wait('@recaptcha');
    cy.get('[id*="loginWithU"]').click();

    cy.get('#inputEmail').type(email, { delay: 180 });
    cy.get('#inputPassword').type(passwd, { delay: 180 }, { log: false });
    cy.get('[type=submit]').first().click();

    cy.wait('@user');
    cy.get('#bf-js-login').should('have.text', 'Entre');
});

Cypress.Commands.add('addToCart', (product) => {
    cy.intercept('**/plugins/customer_chat/SDK/**').as('customerChat');
    cy.wait('@customerChat');

    cy.get('[class*=el] [width="24"]').click();
    cy.get('.bf-search__field').type(product).type('{enter}');

    cy.get('[class="bf-shelf-item__container"]').first().then(container => {
        cy.wrap(container).should('contain', product);
        cy.wrap(container).click();

        cy.contains('Comprar').click();
        cy.get('.bf-buy__button').click({ force: true });

        cy.get('.swal2-confirm').click();
        cy.wait(1000);
        cy.get('#cart-title').should('have.text', 'Meu Carrinho');

        cy.get('table[class="table cart-items"]')
            .should('be.visible')
            .and('contain', product);
    });
});
