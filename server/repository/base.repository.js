/*eslint strict: 0 */

(function() {
    'use strict';

    const logPrefix = '[BaseRepo]:';

    const logger = require('../services/logger.service');


    //*********************************************
    class BaseRepository {

        //=========================================
        //=====          Constructor          =====
        //=========================================
        constructor() {
            //logger.debug(logPrefix, 'Constructor()', '_Application_', `In function.`);
        }

        //===============================================
        //=====           Public Functions          =====
        //===============================================
        getUrlData(url) {
            const funcName = 'GetUrlData()';
            logger.debug(`${logPrefix} ${funcName}. Url param: `, url);

            return new Promise((resolve, reject) => {
                const http = require('http'),
                      https = require('https');

                let client = http;

                if (url.toString().indexOf('https') === 0) {
                    client = https;
                }

                client
                    .get(url, (resp) => {
                        let data = '';

                        // A chunk of data has been recieved.
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });

                        // The whole response has been received. Print out the result.
                        resp.on('end', () => {
                            resolve(data);
                        });
                    })
                    .on('error', (err) => {
                        logger.error(`${logPrefix} ${funcName}. Error: `, err);

                        reject(err);
                    });
            });
        }

        getFileData(path, checkForArray = false) {
            const data = require(path);

            if (data) {
                if (checkForArray) {
                    if (Array.isArray(data)) {
                        if (data.length === 0) {
                            throw new Error('Json Data Model is empty');
                        }
                    }
                }

                return data;
            }

            throw new Error('Json Data Model is empty');
        }

        strToBool(s)
        {
            const regex=/^\s*(true|1|on)\s*$/i;
            return regex.test(s);
        }
    }


    module.exports = BaseRepository;
})();