'use strict'
const service = require('../services/usuarioService')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]
  service.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      return res.status(response.status).send({response})
        //next(response)
    })
}
module.exports = isAuth