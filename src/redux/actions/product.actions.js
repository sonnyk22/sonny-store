// ===============================================================================
// Imported Features (Redux)
import * as types from "../constants/action-types.constant";

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

//*********************************************************
const logPrefix = '[Product.Action]: ';

//*********************************************************
//*****                    Actions                    *****
//*********************************************************
export function loadProductsSuccess(products) {
    logger.debug(`${logPrefix} LoadAllProductsSuccess(). Action: LOAD_ALL_PRODUCT_SUCCESS`);

    return {
        type: types.LOAD_PRODUCTS_SUCCESS,
        products
    };
}