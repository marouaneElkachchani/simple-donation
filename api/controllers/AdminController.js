/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/* global AuthService */

module.exports = {
  LogIn (req, res) {
    const admin = req.body
    AuthService.logInAdmin(admin, (err, result) => {
      if (err) {
        return res.badRequest(err)
      }
      res.ok(result)
    })
  },

  approveAssociation (req, res) {
    const id = req.param('associationId')
    Association.update({
      id: id
    }, {state : sails.config.CONSTANTS.STATES.APD}).exec((err, updatedAssociation) => {
      if (err) return res.negotiate(err)
      res.ok(' updated succefuly ')
    })
  },

}
