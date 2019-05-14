const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tipo_usuario = mongoose.model('Tipo_usuario');

module.exports = (app) => {
  app.use('/', router);
};



router.get('/tipo_usuarios', (req, res, next) => {
  Tipo_usuario.find((err, tipo_usuarios) => {
    if (err) return res.status(500).send({message: 
         'Error al realizar la petición: '+err})
    if (!tipo_usuarios) return res.status(404).send({message: 'No existen tipos de usuario'})      
    return res.status(200).send({ tipo_usuarios })
  });
});

router.get('/tipo_usuarios/:tipo_usuarioId', (req, res, next) => {
  let tipo_usuarioId = req.params.tipo_usuarioId
  Tipo_usuario.findById(tipo_usuarioId, (err, tipo_usuario) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!tipo_usuario) return res.status(404).send({message: `El tipo de usuario no existe`})

    return res.status(200).send({ tipo_usuario })
  })
});

router.post('/tipo_usuario',(req, res, next) => {
  let tipo_usuario = new Tipo_usuario()
  tipo_usuario.id_tipo_usuario= req.body.id_tipo_usuario
  tipo_usuario.descripcion= req.body.descripcion
  
  tipo_usuario.save((err, tipo_usuarioStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ tipo_usuario: tipo_usuarioStored })
  })
});

router.put('/tipo_usuario/:tipo_usuarioId',(req, res, next) => {
  let tipo_usuarioId = req.params.tipo_usuarioId
  let tipo_usuarioUpdate= req.body

  Tipo_usuario.findByIdAndUpdate(tipo_usuarioId, tipo_usuarioUpdate,(err, tipo_usuarioStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ tipo_usuario: tipo_usuarioStored })
  })
});


router.delete('/tipo_usuario/:tipo_usuarioId', (req, res, next) => {
  let tipo_usuarioId = req.params.tipo_usuarioId
  Tipo_usuario.findByIdAndRemove(tipo_usuarioId, (err, tipo_usuario) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!tipo_usuario) return res.status(404).send({message: `El tipo de usuario no existe`})

    return res.status(200).send({ tipo_usuario })
  })
});