const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {
  try {
    const accessToken = req.get('X-Access-Token');
    const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new ClientError(401, 'authentication required');
  }
}

module.exports = authorizationMiddleware;
