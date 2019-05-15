const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cliente= require('../models/cliente')
const Producto= require('../models/producto')

const ServicioSchema = new Schema({
    nombre_servicio: { type:String, required:true},
    cliente: {type: Schema.Types.ObjectId, ref:Cliente, required:true},
    producto:{type: Schema.Types.ObjectId, ref:Producto, required:true},
    
});

ServicioSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Servicio', ServicioSchema);
