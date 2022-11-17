const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  try {
    const accessToken = req.get('X-Access-Token');
    const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new ClientError(401, 'authentication required');
  }
  /**
   * Try to get the 'X-Access-Token' from the request headers.
   * If no token is provided,
   *   throw a 401 error with the message 'authentication required'
   * Use jwt.verify() to verify the authenticity of the token and extract its payload
   * Assign the extracted payload to the user property of the req object.
   * Call next() (with no arguments) to let Express know to advance to its next route or middleware.
   */
}
module.exports = authorizationMiddleware;
