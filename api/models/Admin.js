/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
/* global sails,bcrypt */
const bcrypt = require('bcrypt')

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    }

  },
  beforeCreate (values, cb) {
    bcrypt.hash(values.password, sails.config.CONSTANTS.SALT_ROUNDS, (err, hash) => {
      if (err) return cb(err)
      values.password = hash
      cb()
    })
  }
}
