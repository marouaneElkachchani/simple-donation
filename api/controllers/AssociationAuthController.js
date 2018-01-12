/**
 * AssociationAuthController
 *
 * @description :: Server-side logic for managing AssociationAuths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/* global AuthService */
module.exports = {
  /**
 *@description :: login  an  existing association with email and password
 * @param {string} association- association's credentials
 */
  EmailLogIn (req, res) {
    const association = req.body
    AuthService.logInAssociation(association, (err, result) => {
      if (err) {
        return res.badRequest(err)
      }
      res.ok(result)
    })
  },
  /**
 *@description :: register a new association with email and password
 * @param {string} association- new association's credentials
 */
  EmailSignUP (req, res) {
    const association = req.body
    AuthService.signUpAssociation(association, (err, result) => {
      if (err) {
        return res.badRequest(err)
      }
      res.ok(result)
    })
  }
}
