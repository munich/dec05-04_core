const db = requireFrom('core/dbinterface').getInstance()
const utils = require('../utils')

class TransactionsController {
  index (req, res, next) {
    db.transactions
      .findAll({...req.query, ...utils.paginator()})
      .then(result => {
        if (!result) return utils.respondWith('error', 'No transactions found')

        return utils.respondWith('ok', {
          transactions: utils.toCollection(result.rows, 'transaction')
        })
      })
      .then(() => next())
  }

  show (req, res, next) {
    db.transactions
      .findById(req.query.id)
      .then(result => {
        if (!result) return utils.respondWith('error', 'No transactions found')

        return utils.respondWith('ok', {
          transaction: utils.toResource(result, 'transaction')
        })
      })
      .then(() => next())
  }

  unconfirmed (req, res, next) {
    // needs to be picked up from transaction pool
    utils
      .respondWith('error', 'Method has not yet been implemented.')
      .then(() => next())
  }

  showUnconfirmed (req, res, next) {
    // needs to be picked up from transaction pool
    utils
      .respondWith('error', 'Method has not yet been implemented.')
      .then(() => next())
  }
}

module.exports = new TransactionsController()