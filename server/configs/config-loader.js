/*eslint strict: 0 */

(function () {
    'use strict';

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }

    const logPrefix = '[Router]:';
    const env = process.env.NODE_ENV;

    console.log(`${logPrefix} Load(). Node environment: ${env}`);
    console.log(`${logPrefix} Load(). Loading config.${env}.json`);

    module.exports = require(`../environment/config.${env}.json`);
})();