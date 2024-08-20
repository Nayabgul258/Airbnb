module.exports = (fn) => {
    return (req, res, next) => {
        // Ensure that fn is called and any errors are caught and passed to next()
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
