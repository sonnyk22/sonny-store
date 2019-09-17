/*eslint strict: 0 */

(function () {
    'use strict';

    const _resCodes = {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        MOVED_PERMANENTLY: 301,
        FOUND: 302,
        SEE_OTHER: 303,
        NOT_MODIFIED: 304,
        TEMPORARY_REDIRECT: 307,
        RESUME_INCOMPLETE: 308,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        PRECONDITION_FAILED: 412,
        PAYLOAD_TOO_LARGE: 413,
        REQUESTED_RANGE_NOT_SATISFIABLE: 416,
        TOO_MANY_REQUESTS: 429,
        INTERNAL_SERVER_ERROR: 500,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
    }

    const _yesOrNo = {
        YES: 'YES',
        NO: 'NO'
    };

    //=====================================================

    module.exports = {
        DataPath: '../data',
        WinstonLogPath: '../logs/winston.log',

        ResCodes: _resCodes,
        YesOrNo: _yesOrNo
    };
})();