/**
 * NeedController
 *
 * @description :: Server-side logic for managing needs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const jwt = require('jwt-simple')
module.exports = {
	/**
	 * @description :: creating a new need for association
	 *  @param     :: {object} need- need data
	 */
		createNeed (req, res) {
		},
		/**
	 * @description :: getting a specific need for association
	 *  @param     :: {string} id- need id
	 */
		getNeed (req, res) {
		},
		/**
	 * @description :: getting all needs for association
	 *  @param     :: {string} id- association id
	 */
	 getAllNeeds (req, res) {
	 },
	 /**
	* @description :: update a specific need for association
	*  @param     :: {string} id- association id need data
	*/
	updateNeed (req, res) {
	},
};
