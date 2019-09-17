/*eslint
        strict: 0,
        camelcase: ["error", {allow: ["^Product_"]}]
        prefer-destructuring: 0
*/

(function() {
    'use strict';

    const logPrefix = '[ProductCtrl]:';

    const baseCtrl = require('../../base/base.controller'),
          productRepo = require('../../../repository/Product.repository');

    const logger = require('../../../services/logger.service'),
          tokenSvc = require('../../../services/token.service');


    //*********************************************
    class ProductController extends baseCtrl {

        //=========================================
        //=====          Constructor          =====
        //=========================================
        constructor(router) {
            super();

            // ES6 Style Routes: Product
            router.get('/:skip/:limit', tokenSvc.checkAuthenticated, this.Product_GetAll.bind(this));
            router.get('/:name', tokenSvc.checkAuthenticated, this.Product_GetByName.bind(this));
        }

        //=========================================
        //=====       Product Functions       =====
        //=========================================
        Product_GetAll(req, res) {
            const fName = 'Product_GetAll()';
            logger.debug(logPrefix, fName, 'In function.');

            let skip = null,
                limit = null;

            try {
                skip = req.params.skip;
                limit = req.params.limit;

                logger.debug(logPrefix, fName, 'Skip:', skip);
                logger.debug(logPrefix, fName, 'Limit:', limit);

                this.validateParameter(skip, 'Skip');
                this.validateParameter(limit, 'Limit');
            }
            catch (err) {
                return this.sendResponse_Err(fName, err, res, err.message, true);
            }

            try {
                const isActive = true;

                productRepo
                    .Product_GetAll(skip, limit, isActive)
                    .then((response) => {
                        return this.sendResponse_Model(fName, response, res, false);
                    })
                    .catch((err) => {
                        return this.sendResponse_Err(fName, err, res, 'Retrieval failed');
                    });
            }
            catch (err) {
                return this.sendResponse_Err(fName, err, res, 'Retrieval failed');
            }
        }

        Product_GetByName(req, res) {
            const fName = 'Product_GetByName()';
            logger.debug(`${logPrefix} ${fName}. Req param: `, req.body);

            const name = this.getUrlFragmentId(req, res, fName, 'name');
            if (!name) return;

            const isActive = true;

            productRepo
                .Product_GetByName(name, isActive)
                .then((response) => {
                    return this.sendResponse_Model(fName, response, res, false);
                })
                .catch((err) => {
                    return this.sendResponse_Err(fName, err, res, 'Retrieval failed');
                });
        }
    }


    module.exports = ProductController;
})();