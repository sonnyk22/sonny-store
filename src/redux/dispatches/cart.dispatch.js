// ===============================================================================
// Imported Features (Redux)
import * as actions from '../actions/cart.actions';

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

//*********************************************************
const logPrefix = '[Cart.Dispatch]:';

//*********************************************************
//*****                  Dispatches                   *****
//*********************************************************
export function loadCart() {
    const fName = 'LoadCart()';
    logger.debug(`${logPrefix} ${fName}.  In function.`);

    return function(dispatch) {
        dispatch(actions.loadCartSuccess());
    };
}

export function addToCart(product) {
    const fName = 'AddToCart()';
    logger.debug(`${logPrefix} ${fName}.  Product param: `, product);

    return function(dispatch) {
        dispatch(actions.addToCartSuccess(product));
    };
}

export function deleteFromCart(product) {
    const fName = 'DeleteFromCart()';
    logger.debug(`${logPrefix} ${fName}.  Product param: `, product);

    return function(dispatch) {
        dispatch(actions.deleteFromCartSuccess(product));
    };
}