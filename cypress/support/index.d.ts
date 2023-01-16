/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {

        /**
         * @example
         *  
         * Login support command to run before each test, it is necessary to pass as 
         * an argument the title of the environment variable informed in cypress.env.json, 
         * there you can register the email and password for your test.
         */

        login(): Chainable<any>

        /**
         * @example
         * 
         * Use this command to add products to the cart, you must 
         * pass the title of the product you want to add as an argument.
         */
        
        addingProductToCart(): Chainable<any>
    }
}