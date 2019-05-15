const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Servicio = mongoose.model('Servicio');

module.exports = (app) => {
  app.use('/', router);
};


router.get('/servicios', (req, res, next) => {
    Servicio.find((err, servicios) => {
    if (err) return res.status(500).send({message: 
         'Error al realizar la petición: '+err})
    if (!servicios) return res.status(404).send({message: 'No existen servicios'})      
    return res.status(200).send({ servicios })
  });
});

router.get('/servicios/:servicioId', (req, res, next) => {
  let servicioId = req.params.servicioId
  Servicio.findById(servicioId, (err, servicio) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!servicio) return res.status(404).send({message: `El servicio no existe`})

    return res.status(200).send({ servicio })
  })
});

router.post('/servicio',(req, res, next) => {
  let servicio = new Servicio()
  
  servicio.nombre_servicio=req.body.nombre_servicio
  servicio.cliente=req.body.cliente
  servicio.producto=req.body.producto
  
 

  servicio.save((err, servicioStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ servicio: servicioStored })
  })
});


router.put('/servicio/:servicioId',(req, res, next) => {
  let servicioId = req.params.servicioId
  
  let servicioUpdate= req.body

  Servicio.findByIdAndUpdate(servicioId, servicioUpdate,(err, servicioStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ servicio: servicioStored })
  })
});


router.delete('/servicio/:servicioId', (req, res, next) => {
  let servicioId = req.params.servicioId
  Servicio.findByIdAndRemove(servicioId, (err, servicio) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!servicio) return res.status(404).send({message: `El servicio no existe`})

    return res.status(200).send({ servicio })
  })
});