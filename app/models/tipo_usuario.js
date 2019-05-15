const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tipo_usuarioSchema = new Schema({
  id_tipo_usuario: { type:String, unique:true, required:true},
  descripcion: { type:String, unique:true, required:true},

});

Tipo_usuarioSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Tipo_usuario', Tipo_usuarioSchema);

