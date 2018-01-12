/* global sails, Association */
const jwt = require('jwt-simple')
module.exports = (req, res, next) => {
  let token = req.headers.authorization
  let payload = jwt.decode(token, sails.config.CONSTANTS.JWT_SECRET)
  Association.findOne({id: payload.sub}).exec((err, association) => {
    if (err) return res.forbidden('not authorized')
    next()
  })
}
