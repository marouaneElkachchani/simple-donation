const jwt = require('jwt-simple')
const FB = require('fb')
const moment = require('moment')

module.exports = {
  /**
 * login a donor user with facebook
 * @param {string} token- the facebook-token
 */
/* global Donor ,sails */
  facebookAuth (token, callback) {
    FB.api('me', {fields: ['name', 'email'], access_token: token}, response => {
      if (!response || response.error) {
        callback(!response ? 'error occurred' : response.error)
      }
      let donor = response
      Donor.findOne({
        facebookId: donor.id
      }, (err, user) => {
        if (err)(callback(err))
        else if (user) {
          let payload = {
            sub: user.facebookId,
            exp: moment().add(sails.config.CONSTANTS.EXPIRATION_DAYS_NUMBER, sails.config.CONSTANTS.TIME_UNITY).unix()
          }
          let token = jwt.encode(payload, sails.config.CONSTANTS.JWT_SECRET)
          // eslint-disable-next-line standard/no-callback-literal
          callback({
            donor: user.toJSON(),
            token: token
          })
        } else {
          let newDonor = donor
          Donor.create(newDonor).exec((err, User) => {
            if (err) callback(err)
            let payload = {
              sub: User.facebookId,
              exp: moment().add(sails.config.CONSTANTS.EXPIRATION_DAYS_NUMBER, sails.config.CONSTANTS.TIME_UNITY).unix()
            }
            let token = jwt.encode(payload, sails.config.CONSTANTS.JWT_SECRET)
            // eslint-disable-next-line standard/no-callback-literal
            callback({
              customer: User,
              token: token
            })
          })
        }
      })
    })
  }
}
