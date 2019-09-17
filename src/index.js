// ===============================================================================
// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux';

// ===============================================================================
// Imported Feature (Core)
import { CoreEnvSettings } from './core';

// ===============================================================================
// Imported Feature (Redux)
import configureStore from './redux/store/config.store';
import { loadProducts } from './redux/dispatches/product.dispatch';

// ===============================================================================
// Routes
import routes from './routes/store.route';

// ===============================================================================
// Imported Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.css";
import "./assets/fonts/fontawesome.css";

// ===============================================================================
// Service Worker
import * as serviceWorker from './serviceWorker';

//*********************************************************
//*****                 APP_INITIALIZER               *****
//*********************************************************
// Environment Variables initialization
CoreEnvSettings.loadEnvVariables();

// Store initialization
const store = configureStore();

// PLEASE NOTE: This is not necessary.
// This is just to show how to data before the APP starts
// Also, to make sure Node Server is up and running
store.dispatch(loadProducts());

//*********************************************************
//*****                   ReactDOM                    *****
//*********************************************************
ReactDOM.render(
    <ReduxProvider store={store}>
        <Router>
            <Switch>
                {routes()}
            </Switch>
        </Router>
    </ReduxProvider>,
    document.getElementById('root')
);

//*********************************************************
// Used to test Redux in Chrome Developer Tools
// window.store = store;


//*********************************************************
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();