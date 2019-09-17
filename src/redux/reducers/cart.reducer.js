// ===============================================================================
// Imported Features (Redux)
import * as types from '../constants/action-types.constant';
import initialState from './initialState';

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

//*********************************************************
const logPrefix = '[Cart.Reducer]:';

//*********************************************************
//*****                    Reducer                    *****
//*********************************************************
export default function cartReducer(state = initialState.cart, action) {
    const fName = 'CartReducer()';

    switch (action.type) {
        case types.LOAD_CART_SUCCESS:
            logger.debug(`${logPrefix} ${fName}. Reducer: LOAD_CART_SUCCESS.`);
            return action.cart;

        case types.ADD_TO_CART_SUCCESS:
            logger.debug(`${logPrefix} ${fName}. Reducer: ADD_TO_CART_SUCCESS.`);

            const product = state.find(p => p.product.id === action.product.id );
            if (!product) {
                return [...state, { ...{ product: action.product, quantity: 1 }}];
            }

            const quantity = (product.quantity + 1);

            return [
                ...state.filter(p => p.product.id !== action.product.id),
                { ...{ product: action.product, quantity: quantity }}
              ];

        case types.DELETE_FROM_CART_SUCCESS:
            logger.debug(`${logPrefix} ${fName}. Reducer: DELETE_FROM_CART_SUCCESS.`);
            return state.filter(p => p.product.id !== action.product.product.id);

        default:
            return state;
    }
}