// ===============================================================================
// Imported Features (Redux)
import * as types from "../constants/action-types.constant";

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

//*********************************************************
const logPrefix = '[Cart.Action]: ';

//*********************************************************
//*****                    Actions                    *****
//*********************************************************
export function loadCartSuccess(cart) {
    logger.debug(`${logPrefix} LoadCartSuccess(). Action: LOAD_CART_SUCCESS`);

    return {
        type: types.LOAD_CART_SUCCESS,
        cart
    };
}

export function addToCartSuccess(product) {
    logger.debug(`${logPrefix} AddToCartSuccess(). Action: ADD_TO_CART_SUCCESS`);

    return {
        type: types.ADD_TO_CART_SUCCESS,
        product
    };
}

export function deleteFromCartSuccess(product) {
    logger.debug(`${logPrefix} DeleteFromCartSuccess(). Action: DELETE_FROM_CART_SUCCESS`);

    return {
        type: types.DELETE_FROM_CART_SUCCESS,
        product
    };
}