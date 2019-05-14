const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Categoria = mongoose.model('Categoria');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/categorias', (req, res, next) => {
    Categoria.find((err, categorias) => {
    if (err) return res.status(500).send({message: 
         'Error al realizar la petición: '+err})
    if (!categorias) return res.status(404).send({message: 'No existen categorias'})      
    return res.status(200).send({ categorias })
  });
});

router.get('/categorias/:categoriaId', (req, res, next) => {
  let categoriaId = req.params.categoriaId
  Categoria.findById(categoriaId, (err, categoria) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!categoria) return res.status(404).send({message: `La categoria no existe`})

    return res.status(200).send({ categoria })
  })
});

router.post('/categoria',(req, res, next) => {
  let categoria = new Categoria()
  categoria.id_categoria= req.body.id_categoria
  categoria.nombre_categoria= req.body.nombre_categoria


  categoria.save((err, categoriaStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ categoria: categoriaStored })
  })
});


router.put('/categoria/:categoriaId',(req, res, next) => {
  let categoriaId = req.params.categoriaId
  
  let categoriaUpdate= req.body

  Categoria.findByIdAndUpdate(categoriaId, categoriaUpdate,(err, categoriaStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return  res.status(200).send({ categoria: categoriaStored })
  })
});


router.delete('/categoria/:categoriaId', (req, res, next) => {
  let categoriaId = req.params.categoriaId
  Categoria.findByIdAndRemove(categoriaId, (err, categoria) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!categoria) return res.status(404).send({message: `La categoria no existe`})

    return res.status(200).send({ categoria })
  })
});