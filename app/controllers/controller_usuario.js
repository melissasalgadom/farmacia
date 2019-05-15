const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Tipo_usuario = mongoose.model('Tipo_usuario');

module.exports = (app) => {
  app.use('/', router);
};



router.get('/usuarios', (req, res, next) => {
    Usuario.find((err, usuarios) => {
    if (err) return res.status(500).send({message: 
         'Error al realizar la petición: '+err})
    if (!usuarios) return res.status(404).send({message: 'No existen usuarios'})      
    return res.status(200).send({ usuarios })
  });
});

router.get('/usuarios/:usuarioId', (req, res, next) => {
  let usuarioId = req.params.usuarioId
  Usuario.findById(usuarioId, (err, usuario) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!usuario) return res.status(404).send({message: `El usuario no existe`})

   return  res.status(200).send({ usuario })
  })
});

router.post('/usuario',(req, res, next) => {
  let usuario = new Usuario()
  usuario.tipo_usuario=req.body.tipo_usuario
  usuario.identificacion= req.body.identificacion
  usuario.nombre_usuario= req.body.nombre_usuario
  usuario.telefono= req.body.telefono
  usuario.cargo= req.body.cargo
  usuario.correo_electronico= req.body.correo_electronico
  usuario.contrasena= req.body.contrasena
  
  usuario.save((err, usuarioStored) => {
    if (err) return  res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

    return  res.status(200).send({ usuario: usuarioStored })
  })
});


router.put('/usuario/:usuarioId',(req, res, next) => {
  let usuarioId = req.params.usuarioId
  
  let usuarioUpdate= req.body

  Usuario.findByIdAndUpdate(usuarioId, usuarioUpdate,(err, usuarioStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

    return res.status(200).send({ usuario: usuarioStored })
  })
});


router.delete('/usuario/:usuarioId', (req, res, next) => {
  let usuarioId = req.params.usuarioId
  Usuario.findByIdAndRemove(usuarioId, (err, usuario) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!usuario) return res.status(404).send({message: `El usuario no existe`})

    res.status(200).send({ usuario })
  })
});