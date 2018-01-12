/**
 * Donor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt')
module.exports = {

  attributes: {

    picture: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string'
    },
    name: {
      type: 'string',
      required: true
    },
    age: {
      type: 'integer'
     // required: true
    },
    facebookId: {
      type: 'integer'
    },

  },
  beforeCreate (values, cb) {
    bcrypt.hash(values.password, sails.config.CONSTANTS.SALT_ROUNDS, (err, hash) => {
      if (err) return cb(err)
      values.password = hash
      cb()
    })
  }
};
