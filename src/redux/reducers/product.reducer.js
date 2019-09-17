// ===============================================================================
// Imported Features (Redux)
import * as types from '../constants/action-types.constant';
import initialState from './initialState';

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

//*********************************************************
const logPrefix = '[Products.Reducer]:';

//*********************************************************
//*****                    Reducer                    *****
//*********************************************************
export default function productReducer(state = initialState.products, action) {
    const fName = 'ProductReducer()';

    switch (action.type) {
        case types.LOAD_PRODUCTS_SUCCESS:
            logger.debug(`${logPrefix} ${fName}. Reducer: LOAD_PRODUCTS_SUCCESS.`);
            return action.products;

        default:
            return state;
    }
}
