// ===============================================================================
// Imported Features (Redux)
import * as types from '../constants/action-types.constant';
import initialState from './initialState';

//*********************************************************
//*****                    Reducer                    *****
//*********************************************************
export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
    if (action.type === types.BEGIN_API_CALL) {
        return state + 1;
    }
  
    if (action.type === types.API_CALL_ERROR || _actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state;
}

//*********************************************************
//*****                Private Functions              *****
//*********************************************************
function _actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}