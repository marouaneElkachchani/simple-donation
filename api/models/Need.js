/**
 * Need.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const categories = ['clothes', 'nourishment', 'services', 'equipment', 'money', 'other']
const urgences = ['urgent', 'can wait']
const states = ['god answered', 'waiting']

module.exports = {

  attributes: {
        category : {
          type : 'string',
          enum : categories,
        },
        description : {
          type : 'text'
        },
        urgency : {
          type : 'string',
          enum : urgencies,
        },
        state : {
          type : 'string',
          enum : states,
        },
        association : {
          model : Association,
          unique: true,
        }


  }
};
