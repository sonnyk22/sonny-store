// ===============================================================================
// React
import React from 'react';
import { Route } from 'react-router-dom';

// ===============================================================================
// Imported Features
import routes from "./routes.config";

//*********************************************************
//*****               Helper Functions                *****
//*********************************************************
export default function etcRoutes() {
    return routes.map((prop, key) => {

        if (prop.exact) {
            return <Route exact path={prop.path} component={prop.component} key={key} />
        }
        else if (!prop.path) {
            return <Route component={prop.component} key={key} />
        }

        return (
            <Route path={prop.path} component={prop.component} key={key} />
        )
    });
}