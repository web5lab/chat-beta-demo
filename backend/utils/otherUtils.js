const httpStatus = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    PARTIAL_CONTENT: 206,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INVALID_INPUT: 422,
    NOT_ACCEPTABLE: 406,
    INTERNAL_SERVER: 500,
    UNAUTHORIZATION: 401,
 };

 const responseObject = function (success, error, options) {
    return { success, error, ...options };
 };

 module.exports = {
    httpStatus,
    responseObject
 }