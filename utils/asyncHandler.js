// Wraps an async Express route handler so that any thrown error (or rejected
// promise) is forwarded to next(err) instead of crashing the process or
// falling through to Express's default HTML error page.
const asyncHandler = ( fn ) => ( req, res, next ) => {
    Promise.resolve( fn( req, res, next ) ).catch( next );
};

module.exports = {
    asyncHandler
}
