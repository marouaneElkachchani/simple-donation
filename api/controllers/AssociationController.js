/**
 * AssociationController
 *
 * @description :: Server-side logic for managing Associations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const jwt = require('jwt-simple')

module.exports = {
  /**
   * @description :: creating a new association
   *  @param     :: {object} association- association data
   */
  create(req, res) {

    const association = req.body
    association.state = sails.config.CONSTANTS.STATES.PND

    Association.create(association).exec((err, createdAssociation) => {
      if (err) return res.negotiate(err)
      res.ok(createdAssociation)
    })

  },

  /**
   * @description :: updating an association
   *  @param     :: {object} association- association data
   */
  update(req, res) {

    let associationId = jwt.decode(req.headers.authorization, sails.config.CONSTANTS.JWT_SECRET).sub
    const association = req.body

    const destroyOldAssociation = () => Promise.resolve(Association.destroy({id : associationId}).exec((err) => {
      if (err) res.negotiate(err)
    }))

    const updateAssociation = () => Promise.resolve(Association.update({
      id: associationId
    }, association).exec((err, updatedAssociation) => {
      if (err) return res.negotiate(err)
      res.ok(' updated succefuly ')
    })
    )
    destroyOldAssociation()
      .then(() => {
        return updateAssociation()
      }).catch(err => {
        return res.negotiate(err)
      }
      )
  },

  /**
   * @description :: get a specific association
   *  @param     :: {object} association- association Id
   */
  get(req, res) {
    const id = req.param('associationId')
    Association.find({
      id: id
    }).populate('needs').exec((err, association) => {
      if (err) return res.negotiate(err)
      res.ok(association)
    })
  },
  /**
   * @description :: get all associations
   *  @param     ::
   */
  getAll(req, res) {
    Association.find().populate('needs').exec((err, associations) => {
      if (err) return res.negotiate(err)
      res.ok(associations)
    })
  }


};
