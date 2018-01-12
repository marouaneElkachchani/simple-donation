/* global sails */
const jwt = require('jwt-simple')
module.exports = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) return res.badRequest('no headers')
  let token = req.headers.authorization
  let payload
  payload = jwt.decode(token, sails.config.CONSTANTS.JWT_SECRET)
  if (!payload.sub) return res.forbidden('not authorized')
  next()
}
