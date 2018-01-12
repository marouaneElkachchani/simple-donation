/**
 * DonorAuthController
 *
 * @description :: Server-side logic for managing Donorauths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
 * login or register  a donor with facebook
 * @param {string} facebookToken- facebook token
 */
	facebook (req, res) {
		let facebookToken = req.body.token
		FacebookAuthService.facebookAuth(facebookToken, (err, result) => {
			if (err) {
				return res.badRequest(err)
			}
			res.ok(result)
		})
	},
};
