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
