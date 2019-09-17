/*eslint strict: 0 */

(function() {
    'use strict';

    const logPrefix = '[LoggerSvc]:';

    const constants = require('../common/common.const');

    const winston = require('winston');

    let winstonLog = null;

    console.debug(`${logPrefix} In Logger.js file.`);


    //*********************************************
    class LoggerService {

        //=========================================
        //=====          Constructor          =====
        //=========================================
        constructor() {
            const funcName = 'Constructor()';

            this._isDebugMode = (process.env.NODE_ENV === 'development');
            this.debug(`${logPrefix} ${funcName}. Environment: `, process.env.NODE_ENV);

            const winstonLogPath = require('path').join(__dirname, constants.WinstonLogPath)
            this.debug(`${logPrefix} ${funcName}. Winston log path `, winstonLogPath);

            winstonLog = winston.createLogger({
                format: winston.format.combine(
                    winston.format.splat(),
                    winston.format.simple()
                ),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: winstonLogPath })
                ]
            });
        }

        //================================================
        //===            Public Functions              ===
        //================================================
        error(message, ...params) {
            console.error.apply(console, arguments);
        }

        warn(message, ...params) {
            console.warn.apply(console, arguments);
        }

        info(message, ...params) {
            console.info.apply(console, arguments);
        }

        debug(message, ...params) {
            if (this._isDebugMode) {
                console.log.apply(console, arguments);
            }
        }

        log(message, ...params) {
            if (this._isDebugMode) {
                winstonLog.info.apply(console, arguments);
            }
        }
    }


    module.exports = new LoggerService();
})();