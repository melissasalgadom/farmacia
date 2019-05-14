// Example model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  identificacion: String,
  nombre: String,
  direccion: String,
  telefono:String,
  restriccion:String

});

ClienteSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Cliente', ClienteSchema);

