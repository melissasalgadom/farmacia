const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Tipo_usuario = mongoose.model('Tipo_usuario');
const service = require('../services/usuarioService');
const auth = require('../middlewares/auth')

module.exports = (app) => {
  app.use('/', router);
};



router.get('/usuarios',auth, (req, res, next) => {
    Usuario.find((err, usuarios) => {
    if (err) return res.status(500).send({message: 
         'Error al realizar la petición: '+err})   
    if (!usuarios) return res.status(404).send({message: 'No existen usuarios'})      
    Tipo_usuario.populate(usuarios, { path: "tipo_usuario", select:"descripcion"}, function (err, tipo_usuario) {
      if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
    return res.status(200).send({ usuarios })
  })
})
})


router.get('/usuarios/:usuarioId', auth, (req, res, next) => {
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
  usuario.nombre_usuario= req.body.nombre_usuario
  usuario.correo_electronico= req.body.correo_electronico
  usuario.contrasena= req.body.contrasena

  usuario.save(err => {
    if(err) return res.status(500).send({ message: 
      `Error al crear el usuario: ${err}`})

    return res.status(200).send({ token: service.createToken(usuario) })
  })
});

router.post('/signin',(req, res, next) => {
  Usuario.findOne({ correo_electronico: req.body.correo_electronico }, (err, user) => {
    if (err) return res.status(500).send({ message: 
      `Error al ingresar: ${err}` })
    if (!user) return res.status(404).send({ message: 
      `No existe el usuario: ${req.body.correo_electronico}` })

    return user.compareContrasena(req.body.contrasena,
       (err, isMatch) => {
      if (err) return res.status(500).send(
        { message: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send(
        { message: `Error de contraseña: ${req.body.contrasena}` })

      req.user = user
      return res.status(200).send({ message: 
        'Te has logueado correctamente', 
        token: service.createToken(user) })
    });      
  }).select('_id correo_electronico contrasena');
});


router.put('/usuario/:usuarioId', auth,(req, res, next) => {
  let usuarioId = req.params.usuarioId
  let usuarioUpdate= req.body

  Usuario.findByIdAndUpdate(usuarioId, usuarioUpdate,(err, usuarioStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

    return res.status(200).send({ usuario: usuarioStored })
  })
});

router.delete('/usuario/:usuarioId', auth, (req, res, next) => {
  let usuarioId = req.params.usuarioId
  Usuario.findByIdAndRemove(usuarioId, (err, usuario) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!usuario) return res.status(404).send({message: `El usuario no existe`})

    res.status(200).send({ usuario })
  })
});
