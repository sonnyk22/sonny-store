// ===============================================================================
// Imported Features (Redux)
import * as actions from '../actions/product.actions';
import { beginApiCall } from '../actions/api-status.actions';

// ===============================================================================
// Imported Features (Core)
import { CoreConstant, CoreLogger as logger } from '../../core';

// ===============================================================================
// API
import * as productApi from '../../api/product.api';

//*********************************************************
const logPrefix = '[Product.Dispatch]:';

//*********************************************************
//*****                  Dispatches                   *****
//*********************************************************
export function loadProducts(skip = 0, limit = 9) {
    const fName = 'LoadProducts()';
    logger.debug(`${logPrefix} ${fName}.  Param.  Skip: %s.  Limit: `, skip, limit);

    return function(dispatch) {
        dispatch(beginApiCall());

        return productApi
                .getProducts(skip, limit)
                .then(response => {
                    logger.debug(`${logPrefix} ${fName}. Http GET Response: `, response);

                    if (!response.hasOwnProperty('data')) {
                        throw new Error('No Data property was returned');
                    }

                    dispatch(actions.loadProductsSuccess(response.data));
                })
                .catch(error => {
                    dispatch(actions.loadProductsSuccess(_getError(fName, error)));
                    throw error;
                });
    };
}

//*********************************************************
//*****                Private Functions              *****
//*********************************************************
function _getError(fName, error) {
    const data = {
        error: error.message,
        isServerRunning: true
    };

    if (CoreConstant.ServerNotRunningError.indexOf(error.message) > -1) {
        logger.error(`${logPrefix} ${fName}. NODE Server is NOT running.`);
        data.isServerRunning = false;
    }
    else {
        logger.error(`${logPrefix} ${fName}. Error: `, error);
    }

    return data;
}