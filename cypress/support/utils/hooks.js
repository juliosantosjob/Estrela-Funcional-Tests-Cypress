/// <reference types="cypress" />

/**
 * Support hooks for project execution.
 */

before(() => {
    cy.task('deleteFolder', 'cypress/screenshots');
});

beforeEach(() => {
    cy.log('Starting test...');
    cy.log(`Running Scenario: [ ${Cypress.currentTest.title} ]`);

    cy.visit('/');
    cy.viewport(1024, 768);
});

afterEach(function () {
    this.currentTest.state === 'failed'
        ? cy.wait(1000).screenshot('error/test-failed')
        : cy.wait(1000).screenshot('success/test-success');
    cy.log('Finishing test');
});
