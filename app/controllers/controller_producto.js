const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Producto = mongoose.model('Producto');
const Categoria = mongoose.model('Categoria');
const auth = require('../middlewares/auth')

module.exports = (app) => {
  app.use('/', router);
};


router.get('/productos',auth, (req, res, next) => {
    Producto.find((err, productos) => {
    if (err) return res.status(500).send({message: 
         'Error al realizar la petición: '+err})
    if (!productos) return res.status(404).send({message: 'No existen productos'})      
    Categoria.populate(productos, { path: "categoria", select: "nombre_categoria"}, function (err, categoria) {
      if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
    return res.status(200).send({ productos })

  });
});

router.get('/productos/:productoId',auth, (req, res, next) => {
  let productoId = req.params.productoId
  Producto.findById(productoId, (err, producto) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!producto) return res.status(404).send({message: `El producto no existe`})

    return res.status(200).send({ producto })
  })
});

router.post('/producto',(req, res, next) => {
  let producto = new Producto()
  
  producto.categoria= req.body.categoria
  producto.nombre_producto= req.body.nombre_producto
  producto.descripcion= req.body.descripcion
  producto.precio_unitario= req.body.precio_unitario
  producto.cantidad= req.body.cantidad
  producto.medicamento_control= req.body.medicamento_control
  producto.frecuencia= req.body.frecuencia
  producto.dosis= req.body.dosis
  producto.total_tomar= req.body.total_tomar
 

  producto.save((err, productoStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ producto: productoStored })
  })
});


router.put('/producto/:productoId', auth,(req, res, next) => {
  let productoId = req.params.productoId
  
  let productoUpdate= req.body

  Producto.findByIdAndUpdate(productoId, productoUpdate,(err, productoStored) => {
    if (err) return res.status(500).send({message: 
      `Error al salvar en la base de datos: ${err} `})

      return res.status(200).send({ producto: productoStored })
  })
});


router.delete('/producto/:productoId', auth,(req, res, next) => {
  let productoId = req.params.productoId
  Producto.findByIdAndRemove(productoId, (err, producto) => {
    if (err) return res.status(500).send({message: 
      'Error al realizar la petición: '+ err})
    if (!producto) return res.status(404).send({message: `El producto no existe`})

    return res.status(200).send({ producto })
  })
})
});
