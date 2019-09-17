// ===============================================================================
// React
import React from 'react';

//*********************************************************
//*****                  Components                   *****
//*********************************************************
class ErrorBoundary extends React.Component {

    //=========================================
    //=====          Constructor          =====
    //=========================================
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    //=========================================
    //=====      Lifecycle Functions      =====
    //=========================================
    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });

        // Log the error to an error reporting service such as SPLUNK
        //logErrorToMyService(error, info);
    }

    //=========================================
    //=====             RENDER            =====
    //=========================================
    render() {
        if (this.state.hasError) {
            // Error path
            return (
                <div>
                    <h2>React/NodeJS Assessment - Something went wrong.</h2>

                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}

                        <br />

                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        // Normally, just render Children
        return this.props.children;
    }
}

export default ErrorBoundary;