/// <reference types="cypress" />

describe('Validate scenarios login', function () {

    it('login success', function () {
        cy.intercept('**/recaptcha/api2/**').as('recaptcha');
        cy.intercept('**/profileSystem/getProfile').as('getProfile');
        cy.intercept('**/api/events').as('user');

        cy.get('#bf-js-login').click();
        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(`${Cypress.env('email')}`, { delay: 180 });
        cy.get('#inputPassword').type(`${Cypress.env('passwd')}`, { delay: 180 }, { log: false });
        cy.get('[type=submit]').first().click();

        cy.wait('@user');
        cy.title().should('eq', 'Loja Estrela - Vestidos, Acessórios Femininos');
        cy.get('#bf-js-login').should('have.text', 'Entre');

        cy.get('#bf-js-login').click();
        cy.get('a[title="Minha Conta"]').last().click();
        cy.wait('@getProfile');

        cy.get('.bf-account__title')
            .should('be.visible')
            .and('have.text', 'Minha Conta');
    });

    it.skip('login email error', function () {
        cy.intercept('**/recaptcha/api2/**').as('recaptcha');
        cy.get('#bf-js-login').click();

        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(`${Cypress.env('emailError')}`, { delay: 180 });
        cy.get('#inputPassword').type(`${Cypress.env('password')}`, { delay: 180 });
        cy.get('[type=submit]').first().click();

        cy.get('[class="alert alert-warning alert-wrong-pswd"]')
            .should('be.visible')
            .and('have.contain', 'Usuário e/ou senha errada');
    });

    it.skip('login password error', function () {
        cy.intercept('**/recaptcha/api2/**').as('recaptcha');
        cy.get('#bf-js-login').click();

        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(`${Cypress.env('email')}`, { delay: 180 });
        cy.get('#inputPassword').type(`${Cypress.env('passwordError')}`, { delay: 180 });
        cy.get('[type=submit]').first().click();

        cy.get('[class="alert alert-warning alert-wrong-pswd"]')
            .should('be.visible')
            .and('have.contain', 'Usuário e/ou senha errada');
    });
});