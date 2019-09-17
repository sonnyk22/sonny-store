// ===============================================================================
// Imported Features (Redux)
import * as types from '../constants/action-types.constant';

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

//*********************************************************
const logPrefix = '[Api-Status.Action]: ';

//*********************************************************
//*****                    Actions                    *****
//*********************************************************
export function beginApiCall() {
    logger.debug(`${logPrefix} BeginApiCall(). Action: BEGIN_API_CALL`);

    return {
        type: types.BEGIN_API_CALL
    };
}

export function apiCallError() {
    logger.debug(`${logPrefix} ApiCallError(). Action: API_CALL_ERROR`);

    return {
        type: types.API_CALL_ERROR
    };
}
