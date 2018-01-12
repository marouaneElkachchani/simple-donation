/* global sails, Need */
const jwt = require('jwt-simple')
module.exports = (req, res, next) => {
  let NeedId = req.param('needId')
  let token = req.headers.authorization
  let associationId = jwt.decode(token, sails.config.CONSTANTS.JWT_SECRET).sub
  Need.findOne({id: NeedId}, (err, need) => {
    if (err) return res.negotiate(err)
    else if (need.owner !== associationId) return res.forbidden('not authorized')
    next()
  })
}
