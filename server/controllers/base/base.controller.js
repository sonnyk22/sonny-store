/*eslint
        strict: 0,
        camelcase: ["error", {allow: ["^sendResponse_"]}]
*/

(function() {
    'use strict';

    const logPrefix = '[BaseCtrl]:';

    const constants = require('../../common/common.const'),
          logger = require('../../services/logger.service');


    //*********************************************
    class BaseController {

        //=========================================
        //=====          Constructor          =====
        //=========================================
        constructor() {
            //logger.debug(`${logPrefix} Constructor(). In function.`);
        }

        //===============================================
        //=====         Protected Functions         =====
        //===============================================
        validateParameter(param, paramName) {
            if (typeof param === 'undefined' || param === null) {
                throw new Error(`${paramName} cannot be Null or Undefined`);
            }
        }

        getUrlFragmentId(req, res, funcName, idName) {
            let id = null;

            try {
                this.validateParameter(req.body, 'Req');

                id = req.params[idName];

                logger.debug(`${logPrefix} ${funcName}. ${idName}:`, id);
                this.validateParameter(id, idName);
            }
            catch (err) {
                logger.debug(`${logPrefix} ${funcName}. Error:`, err);  // Debug OK

                res.status(constants.ResCodes.BAD_REQUEST)
                   .json(this.payload(constants.ResCodes.BAD_REQUEST, err.message, null, funcName));
            }

            return id;
        }

        getParamValue(body, param, type, defaultVal) {
            if (!param) {
                throw new Error(`${defaultVal} is Null`);
            }

            if (body.hasOwnProperty(param)) {
                if (type === 'array') {
                    if (Array.isArray(body[param])) {
                        return body[param];
                    }
                }
                else if (type === 'number') {
                    if (typeof body[param] === 'number') {
                        return body[param];
                    }
                    else {
                        throw new Error(`${param} is not a Number`);
                    }
                }
                else {
                    return body[param];
                }
            }

            return defaultVal;
        }

        payload(status, message, data, funcName) {
            return {
                status: status,
                message: (message === null) ? null : `${funcName}. ${message}.`,
                data: data
            }
        }

        sendResponse(funcName, err, retModel, res, errMsg, onlyPartial) {
            if (err) {
                logger.debug(`${logPrefix} ${funcName}. Error:`, err);

                let message = err;
                if (err.hasOwnProperty('message')) {
                    message = err.message;
                }

                res.status(constants.ResCodes.NOT_FOUND)
                   .json(this.payload(constants.ResCodes.NOT_FOUND, `${errMsg}. ${message}`, null, funcName));

                return false;
            }

            logger.debug(`${logPrefix} ${funcName}. Returned model:`, retModel);

            if (retModel === null) {
                res.status(constants.ResCodes.NOT_FOUND)
                   .send(this.payload(constants.ResCodes.NOT_FOUND, 'Data was not found', null, funcName));

                return false;
            }

            if (onlyPartial) {
                return true;
            }

            res.status(constants.ResCodes.OK)
               .json(this.payload(constants.ResCodes.OK, null, retModel, funcName));
        }

        sendResponse_Err(funcName, err, res, errMsg, badRequest = false) {
            if (badRequest) {
                logger.error(logPrefix, funcName, `Error:`, err);

                res.status(constants.ResCodes.BAD_REQUEST)
                   .json(this.payload(constants.ResCodes.BAD_REQUEST, errMsg, null, funcName));

                return false;
            }

            if (err) {
                if (typeof err === 'string') {
                    res.status(constants.ResCodes.NOT_FOUND)
                       .json(this.payload(constants.ResCodes.NOT_FOUND, `${errMsg}. ${err}`, null, funcName));

                   return false;
                }

                logger.error(`${logPrefix} ${funcName}. Error:`, err);

                let message = err;
                if (err.hasOwnProperty('message')) {
                    message = err.message;
                }

                res.status(constants.ResCodes.INTERNAL_SERVER_ERROR)
                   .json(this.payload(constants.ResCodes.INTERNAL_SERVER_ERROR, message, null, funcName));

                return false;
            }
        }

        sendResponse_Model(funcName, retModel, res, onlyPartial) {
            logger.debug(`${logPrefix} ${funcName}. Returned model:`, retModel);

            if (retModel === null) {
                res.status(constants.ResCodes.NOT_FOUND)
                   .send(this.payload(constants.ResCodes.NOT_FOUND, 'Data was not found', null, funcName));

                return false;
            }

            if (onlyPartial) {
                return true;
            }

            res.status(constants.ResCodes.OK)
               .json(this.payload(constants.ResCodes.OK, '', retModel, funcName));
        }
    }


    module.exports = BaseController;
})();