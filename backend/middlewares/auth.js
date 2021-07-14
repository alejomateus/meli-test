const Response = require('../utils/response');

let meliKeyValidation = (req, res, next) => {
    let melikey = req.headers.melikey;
    if (!melikey) {
        return Response.unauthorized(res, 'melikey no provider');
    } else if (melikey !== process.env.MELIKEY) {
        return Response.unauthorized(res, 'Invalid melikey');
    }
    return next();
};
module.exports = {
    meliKeyValidation
}