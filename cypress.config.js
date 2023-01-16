const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { defineConfig } = require('cypress');
const { rmdir } = require('fs');
const fs = require('fs');
require('dotenv').config();

module.exports = defineConfig({
    modifyObstructiveCode: true,
    e2e: {
        setupNodeEvents(on, config) {
            config.baseUrl = process.env.BASE_URL;
            config.env.email = process.env.EMAIL;
            config.env.passwd = process.env.PASSWD;
            config.env.emailError = process.env.EMAIL_ERROR;
            config.env.passwdError = process.env.PASSWD_ERROR;

            on('task', {
                deleteFolder(path) {
                    if (fs.existsSync(path)) {
                        return new Promise((resolve, reject) => {
                            rmdir(path, { recursive: true }, (err) => {
                                if (err) {
                                    return reject(err);;
                                }
                                resolve(null);
                            });
                        });
                    }
                    return null;
                }
            });

            allureWriter(on, config);
            return config;
        },

        env: {
            allure: true
        }
    },
});