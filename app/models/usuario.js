const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsuarioSchema = new Schema({
  id_tipo_usuario: String,
  descripcion: String,
  identificacion: String,
  nombre: String,
  telefono:String,
  cargo:String,
  correo_electronico:String,
  contrasena:String
});

UsuarioSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Usuario', UsuarioSchema);
