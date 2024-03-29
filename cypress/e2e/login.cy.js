describe('Validate scenarios login', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('passwd');
    const emailError = Cypress.env('emailError');
    const passwdError = Cypress.env('passwdError');
    
    beforeEach(() => { 
        cy.intercept('**/recaptcha/api2/**').as('recaptcha');
        cy.intercept('**/profileSystem/getProfile').as('getProfile');
        cy.intercept('**/api/events').as('user');
    });

    it('Login success', () => {
        cy.get('#bf-js-login').click();
        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(email, { delay: 180 });
        cy.get('#inputPassword').type(password, { delay: 180 }, { log: false });
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

    it('Login email error', () => {
        cy.get('#bf-js-login').click();
        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(emailError, { delay: 180 });
        cy.get('#inputPassword').type(password, { delay: 180 });
        cy.get('[type=submit]').first().click();

        cy.get('[class="alert alert-warning alert-wrong-pswd"]')
            .should('be.visible')
            .and('have.contain', 'Usuário e/ou senha errada');
    });

    it('Login password error', () => {
        cy.get('#bf-js-login').click();
        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(email, { delay: 180 });
        cy.get('#inputPassword').type(passwdError, { delay: 180 });
        cy.get('[type=submit]').first().click();

        cy.get('[class="alert alert-warning alert-wrong-pswd"]')
            .should('be.visible')
            .and('have.contain', 'Usuário e/ou senha errada');
    });
});