(function() {
    'use strict';

    const logPrefix = '[TokenSvc]:';

    const constants = require('../common/common.const'),
          logger = require('../services/logger.service'),
          bcryptCreds = require('../configs/credential-bcrypt');

    const jwt = require('jwt-simple');


    //*********************************************
    class TokenService {

        //=========================================
        //=====          Constructor          =====
        //=========================================
        constructor() {
        }

        //================================================
        //===            Public Functions              ===
        //================================================
        checkAuthenticated(req, res, next) {
            // NOTE: I've added below to show how to Authenticate


            // if (!req.header('authorization')) {
            //     res.status(constants.ResCodes.UNAUTHORIZED)
            //        .json({
            //            status: constants.ResCodes.UNAUTHORIZED,
            //            message: 'Unauthorized. Missing Auth Header',
            //            data: null
            //        });

            //     return;
            // }

            // const token = req.header('authorization'),
            //       payload = jwt.decode(token, bcryptCreds.password);

            // let unauthorized = false;
            // if (!payload) {
            //     unauthorized = true;
            // }

            // if (unauthorized) {
            //     res.status(constants.ResCodes.UNAUTHORIZED)
            //        .json({
            //            status: constants.ResCodes.UNAUTHORIZED,
            //            message: 'Unauthorized. Auth Header Invalid',
            //            data: null
            //        });

            //     return;
            // }

            // req.userId = payload.orgUserId;

            next();
        }

        createSendToken(model) {
            const payload = { sub: model.id },
                  token = jwt.encode(payload, bcryptCreds.password);

            return token;
        }
    }


    module.exports = new TokenService();
})();