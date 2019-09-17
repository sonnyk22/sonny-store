// ===============================================================================
// Internal Features (Core)
import { CoreConstant } from '../index';

/*eslint
        no-console: 0
        prefer-rest-params: 0
*/

//*********************************************************
//*****                    Classes                    *****
//*********************************************************
export default class CoreLogger {

    //================================================
    //===            Public Functions              ===
    //================================================
    static error(...args) {
        if (CoreConstant.NodeEnv === 'development') {
            // Report to SPLUNK if flag is true
            if (CoreConstant.SplunkReport) {
                _reportErrorToSplunk(args);
            }

            _applyConsoleMethod('error', args);
        }
    }

    static warn(message, ...optionalParams) {
        if (CoreConstant.NodeEnv === 'development') {
            console.warn.apply(console, arguments);
        }
    }

    static info(message, ...optionalParams) {
        if (CoreConstant.NodeEnv === 'development') {
            console.info.apply( console, arguments);
        }
    }

    static debug(message, ...optionalParams) {
        if (CoreConstant.NodeEnv === 'development') {
            console.log.apply(console, arguments);
        }
    }

    static log(message, ...optionalParams) {
        if (CoreConstant.NodeEnv === 'development') {
            console.log.apply(console, arguments);
        }
    }
}

//================================================
//===            Private Functions             ===
//================================================
function _applyConsoleMethod(method, args) {
    const levelStyles = {
        debug: 'color:green',
        info: 'color:blue',
        warn: 'color:orange',
        error: 'color:red'
    };

    console.group.apply(console, [`%c ${method.toLocaleUpperCase()}:`, levelStyles[method]]);
    console[method].apply(console, args);
    console.groupEnd.apply(console);
}

function _reportErrorToSplunk(args) {
    if (args && args.length > 0) {
        const arg = args[CoreConstant.SplunkReport];

        // Return if 1st param is false
        if (typeof arg === 'boolean' && !arg) {
            return false;
        }
        else if (typeof arg === 'boolean') {
            /*eslint no-else-return: 0 */
            args.shift(); // Remove Boolean flag
        }

        // Write report code below
        // ...
    }
}