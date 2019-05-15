// Example model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  identificacion: { type:String, unique:true, required:true},
  nombre: { type:String, required:true},
  direccion: { type:String, unique:true, required:true},
  telefono:{ type:String, unique:true, required:true},
  restriccion: { type:String, required:true},
});

ClienteSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Cliente', ClienteSchema);

