const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Cliente.find((err, cliente) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Aprendiendo handlebars',
      cliente: cliente
    });
  });
});

router.get('/clientes', (req, res, next) => {
  Cliente.find((err, clientes) => {
    if (err) return res.status(500).send({message: 
         'Error al realizar la petición: '+err})
    if (!clientes) return res.status(404).send({message: 'No existen clientes'})      
    return res.status(200).send({ clientes })
  });
});

router.get('/clientes/:clienteId', (req, res, next) => {
  let clienteId = req.params.clienteId
  Cliente.findById(clienteId, (err, cliente) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!cliente) return res.status(404).send({message: `El cliente no existe`})

    return res.status(200).send({ cliente })
  })
});

router.post('/cliente',(req, res, next) => {
  let cliente = new Cliente()
  cliente.identificacion= req.body.identificacion
  cliente.nombre= req.body.nombre
  cliente.direccion= req.body.direccion
  cliente.telefono= req.body.telefono
  cliente.restriccion= req.body.restriccion

  cliente.save((err, clienteStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ cliente: clienteStored })
  })
});


router.put('/cliente/:clienteId',(req, res, next) => {
  let clienteId = req.params.clienteId
  
  let clienteUpdate= req.body

  Cliente.findByIdAndUpdate(clienteId, clienteUpdate,(err, clienteStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ cliente: clienteStored })
  })
});


router.delete('/cliente/:clienteId', (req, res, next) => {
  let clienteId = req.params.clienteId
  Cliente.findByIdAndRemove(clienteId, (err, cliente) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!cliente) return res.status(404).send({message: `El cliente no existe`})

    return res.status(200).send({ cliente })
  })
});