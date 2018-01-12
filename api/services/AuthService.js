/* global sails Association , Admin */
const jwt = require('jwt-simple')
const moment = require('moment')
const bcrypt = require('bcrypt')

module.exports = {

  /**
 * register a new  association
 * @param {string} association-  association's credentials
 */
  signUpAssociation (association, callback) {
    Association.findOne({
      email: association.email
    }, (err, user) => {
      if (err) return callback(err)
      if (user) return callback(new Error('email already in use '))
      Association.create(association).exec((err, User) => {
        if (err) return callback(err)
        let payload = {
          sub: User.id,
          exp: moment().add(sails.config.CONSTANTS.EXPIRATION_DAYS_NUMBER, sails.config.CONSTANTS.TIME_UNITY).unix()
        }
        let token = jwt.encode(payload, sails.config.CONSTANTS.JWT_SECRET)
        callback(null, {
          user: User.toJSON(),
          token: token
        })
      })
    })
  },
  /**
 * login  an  existing association
 * @param {string} association- association's credentials
 */
  logInAssociation (association, callback) {
    Association.findOne({
      email: association.email
    }, (err, User) => {
      if (err) return callback(err)
      else if (bcrypt.compareSync(association.password, User.password)) {
        let payload = {
          sub: User.id,
          exp: moment().add(sails.config.CONSTANTS.EXPIRATION_DAYS_NUMBER, sails.config.CONSTANTS.TIME_UNITY).unix()
        }
        let token = jwt.encode(payload, sails.config.CONSTANTS.JWT_SECRET)
        callback(null, {
          user: User.toJSON(),
          token: token
        })
      } else {
        callback(new Error('wrong password'))
      }
    })
  },
  /**
 * login  an  admin
 * @param {string} admin- admin's credentials
 */
  logInAdmin (admin, callback) {
    Admin.findOne({
      email: admin.email
    }, (err, User) => {
      if (err) return callback(err)
      else if (bcrypt.compareSync(admin.password, User.password)) {
        let payload = {
          sub: User.id,
          exp: moment().add(sails.config.CONSTANTS.EXPIRATION_DAYS_NUMBER, sails.config.CONSTANTS.TIME_UNITY).unix()
        }
        let token = jwt.encode(payload, sails.config.CONSTANTS.JWT_SECRET)
        callback(null, {
          user: User.toJSON(),
          token: token
        })
      } else {
        callback(new Error('wrong password'))
      }
    })
  }
}
