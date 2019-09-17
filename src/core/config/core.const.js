//*********************************************************
//*****                Private Variables              *****
//*********************************************************
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
    SERVICE_UNAVAILABLE: 503
}

//*********************************************************
//*****                Global Constants               *****
//*********************************************************
const CoreConstant = {
    App_Title: `Sonny's Store Assessment Code`,

    ServerNotRunningError: [
        'Failed to fetch',
        'NetworkError when attempting to fetch resource.'
    ],
    SplunkReport: true,

    NodeEnv: 'development',
    ServiceBaseUrl: 'http://localhost:3035',

    ResCodes: _resCodes
};

export default CoreConstant;