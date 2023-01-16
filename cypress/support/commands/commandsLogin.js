/// <reference types="cypress" />

Cypress.Commands.add('login', (email, password) => {
    cy.intercept('**/api/events').as('user');
    cy.intercept('**/recaptcha/api2/**').as('recaptcha');

    cy.get('#bf-js-login').click();
    cy.wait('@recaptcha');
    cy.get('[id*="loginWithU"]').click();

    cy.get('#inputEmail').type(`${Cypress.env(email)}`, { delay: 180 });
    cy.get('#inputPassword').type(`${Cypress.env(password)}`, { delay: 180 }, { log: false });
    cy.get('[type=submit]').first().click();

    cy.wait('@user');
    cy.get('#bf-js-login').should('have.text', 'Entre');
});