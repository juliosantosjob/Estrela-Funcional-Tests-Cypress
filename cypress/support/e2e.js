/// <reference types="cypress" />

import './utils/hooks';
import './commands/commands';
import './commands/commandsProducts';
import '@shelex/cypress-allure-plugin';

Cypress.on('uncaught:exception', () => { return false; });

const origLog = Cypress.log;
Cypress.log = function (opts, ...other) {
    if (opts.displayName === 'script' || opts.name === 'request') { return; }
    return origLog(opts, ...other);
};
