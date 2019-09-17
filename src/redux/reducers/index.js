// ===============================================================================
// React
import { combineReducers } from 'redux';

// ===============================================================================
// Imported Features (Redux)
import cart from './cart.reducer';
import products from './product.reducer';
import apiCallsInProgress from './api-status.reducer';

//*********************************************************
//*****                   Constants                   *****
//*********************************************************
const rootReducer = combineReducers({
    cart: cart,
    products: products,
    apiCallsInProgress
});

export default rootReducer;