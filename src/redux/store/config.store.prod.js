// ===============================================================================
// React
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

// ===============================================================================
// Imported Features (Redux)
import rootReducer from '../reducers';

//*********************************************************
//*****                      Store                    *****
//*********************************************************
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}