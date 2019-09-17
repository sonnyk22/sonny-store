// ===============================================================================
// React
import React from 'react';

// ===============================================================================
// Imported Features (Core)
import { ErrorBoundary, CoreConstant, CoreLogger as logger } from '../../core';

// ===============================================================================
// Imported Components
import { Topbar, Category } from '../index';

/*eslint
        no-unused-vars: 0,
        jsx-a11y/anchor-is-valid: 0
*/

//*********************************************************
const logPrefix = '[AppJsx]:';

//*********************************************************
//*****                  Components                   *****
//*********************************************************
class App extends React.Component {

    //=========================================
    //=====      Lifecycle Functions      =====
    //=========================================
    componentDidMount() {
        document.title = CoreConstant.App_Title;

        logger.debug(`${logPrefix} ComponentDidMount(). Loaded App Component.`);
    }

    //=========================================
    //=====             RENDER            =====
    //=========================================
    render() {
        return (
            <div className="wrapper">
                <ErrorBoundary>
                    <Topbar></Topbar>

                    <div className="main-panel">
                        <Category></Category>
                    </div>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;