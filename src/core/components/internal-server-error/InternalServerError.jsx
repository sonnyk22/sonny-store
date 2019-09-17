// ===============================================================================
// React
import React from "react";
import { connect } from 'react-redux';

// ===============================================================================
// Imported Features (Core)
import { CoreConstant } from '../../../core';

//*********************************************************
//*****                  Components                   *****
//*********************************************************
function InternalServerError({ props }) {
    return (
        <>
            <h1>Error 500!  Internal Server Error.</h1>

            {props.hasServerStarted &&
                <h1>NODE server has not been started.</h1>
            }
         </>
    );
}

//*********************************************************
//*****                Redux Container                *****
//*********************************************************
function mapStateToProps(state) {
    const props = {
        hasServerStarted: false
    }

    if (!state) {
        return props;
    }

    if (state.hasOwnProperty('restaurants')) {
        if (state.restaurants.hasOwnProperty('error')) {
            if (CoreConstant.ServerNotRunningError.indexOf(state.restaurants.error) > -1) {
                props.hasServerStarted = true;
            }
        }
    }

    return {
        props: props
    };
}

export default connect(mapStateToProps)(InternalServerError);