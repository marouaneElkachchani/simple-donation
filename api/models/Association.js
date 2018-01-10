/**
 * Association.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt')
const fields = ['poverty', 'childcare', 'education', 'health', 'environment', 'awareness', 'all']
const states = ['pending', 'approved', 'denied']

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    phone: {
      type : 'string'
    },
    city : {
      type : 'string',
      required: true
    },
    address : {
      type : 'string'
      required: true
    },
    field : {
      type: 'string',
      enum: fields,
      required: true
    },
    state :{
      type: 'string',
      enum: states,
      required: true
    },
    needs: {
      collection: 'need',
      via: 'association'
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
