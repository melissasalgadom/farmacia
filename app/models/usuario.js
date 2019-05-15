const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tipo_usuario= require('../models/tipo_usuario')

const UsuarioSchema = new Schema({
  tipo_usuario: {type: Schema.Types.ObjectId, ref:Tipo_usuario, required:true},
  identificacion:{ type:String, unique:true, required:true},
  nombre_usuario: { type:String, unique:true, required:true},
  telefono:{ type:String, unique:true},
  cargo:{ type:String, required:true},
  correo_electronico:{ type:String, unique:true, required:true},
  contrasena:{ type:String, required:true},
});

UsuarioSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Usuario', UsuarioSchema);
