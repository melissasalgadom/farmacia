const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
  id_categoria:{ type:String, unique:true, required:true},
  nombre_categoria:{ type:String, unique:true, required:true}

});

CategoriaSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Categoria', CategoriaSchema);
