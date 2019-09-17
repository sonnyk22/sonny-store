// ===============================================================================
// Imported Features (Core)
import { CoreConstant, CoreLogger as logger } from '../../core';

/*eslint dot-notation: 0 */

//*********************************************************
const logPrefix = '[CoreEnvSettings]:';

//*********************************************************
//*****                Helper Classes                 *****
//*********************************************************
export default class CoreEnvSettings {

    //================================================
    //===            Public Functions              ===
    //================================================
    static loadEnvVariables() {
        const fName = 'LoadEnvVariables()';
        logger.debug(`${logPrefix} ${fName}. In function.`);

        // Please NOTE: Use CommonJS require below so we can dynamically 
        //              import during build-time.

        if (typeof process.env['NODE_ENV'] !== 'undefined') {
            CoreConstant.NodeEnv = process.env.NODE_ENV;
        }
        
        if (typeof process.env['REACT_APP_SERVICE_BASE_URL'] !== 'undefined') {
            CoreConstant.ServiceBaseUrl = process.env.REACT_APP_SERVICE_BASE_URL;
        }

        if (typeof process.env['REACT_APP_SPLUNK_REPORT'] !== 'undefined') {
            CoreConstant.SplunkReport = process.env.REACT_APP_SPLUNK_REPORT;
        }
       
        logger.debug(`${logPrefix} ${fName}. NODE_ENV value: `, CoreConstant.NodeEnv);
        logger.debug(`${logPrefix} ${fName}. REACT_APP_SPLUNK_REPORT value: `, CoreConstant.SplunkReport);
        logger.debug(`${logPrefix} ${fName}. SERVICE_BASE_URL value: `, CoreConstant.ServiceBaseUrl);
    }    
}