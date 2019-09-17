// ===============================================================================
// React
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

// ===============================================================================
// Imported Features (Redux)
import rootReducer from '../reducers';

//*********************************************************
//*****                   Constants                   *****
//*********************************************************
const loggerMiddleware = createLogger();

//*********************************************************
//*****                      Store                    *****
//*********************************************************
export default function configureStore(initialState) {
    // Add support for Redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk, loggerMiddleware, reduxImmutableStateInvariant()))
    );
}
