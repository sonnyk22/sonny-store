/*eslint
        strict: 0,
        camelcase: ["error", {allow: ["^Product_"]}]
*/

(function() {
    'use strict';

    const logPrefix = '[ProductRepository]:';

    const baseRepo = require('./base.repository');

    const logger = require('../services/logger.service'),
          constants = require('../common/common.const');

    const prefixPath = `${__dirname}/${constants.DataPath}`,
          dataPath = `${prefixPath}/products.json`;


    //************************************************
    class ProductRepository extends baseRepo  {

        //=========================================
        //=====        Public Functions       =====
        //=========================================
        Product_GetAll(skip, limit, isActive) {
            const funcName = 'Product_GetAll()';
            logger.debug(`${logPrefix} ${funcName}. Param.  Skip: %s.  Limit: `, skip, limit);

            return new Promise((resolve, reject) => {
                try {
                    const data = this.getFileData(dataPath);

                    let products = data.filter(p => this.strToBool(p.isActive) === isActive);
                    if (!products) {
                        throw new Error(`Unable to load Products.`);
                    }

                    products = products.slice(skip, limit);
                    logger.debug(`${logPrefix} ${funcName}. Products list: `, products);

                    return resolve(products);
                }
                catch (err) {
                    logger.error(`${logPrefix} ${funcName}. Error: `, err);
                    return reject(`Failed to load Products data.  Error: ${err.message}`);
                }
            });
        }

        Product_GetByName(name, isActive) {
            const funcName = 'Product_GetByName()';
            logger.debug(`${logPrefix} ${funcName}. Params.  Name: %s.  IsActive: `, name, isActive);

            return new Promise((resolve, reject) => {
                try {
                    const data = this.getFileData(dataPath);
                    const products = data.filter(p => {
                        return (this.strToBool(p.isActive) === isActive &&
                                p.name.search(new RegExp(name, 'i')) > -1)
                    });

                    if (!products) {
                        throw new Error(`Unable to load Products based on Name: ${name}`);
                    }
                    logger.debug(`${logPrefix} ${funcName}. Products list: `, products);

                    return resolve(products);
                }
                catch (err) {
                    logger.error(`${logPrefix} ${funcName}. Error: `, err);
                    return reject(`Failed to load Products data. Error: ${err.message}`);
                }
            });
        }
    }


    module.exports = new ProductRepository();
})();