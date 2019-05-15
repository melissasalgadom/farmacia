const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Categoria= require('../models/categoria')

const ProductoSchema = new Schema({
    categoria: {type: Schema.Types.ObjectId, ref:Categoria, required:true},
    nombre_producto: { type:String, required:true},
    descripcion:{ type:String, required:true},
    precio_unitario: { type:Number, required:true},
    cantidad: { type:Number, required:true},
    medicamento_control: { type:Boolean, required:true},
    frecuencia: { type:Number, required:true},
    dosis: { type:Number, required:true},
    total_tomar: { type:Number, required:true},
    
});

ProductoSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Producto', ProductoSchema);
