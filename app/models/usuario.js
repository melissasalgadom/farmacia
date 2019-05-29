const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tipo_usuario= require('../models/tipo_usuario')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')


const UsuarioSchema = new Schema({
  tipo_usuario: {type: Schema.Types.ObjectId, ref:Tipo_usuario, required:true},
  correo_electronico:{ type:String, unique:true, required:true, lowercase: true},
  nombre_usuario: { type:String, unique:true, required:true},
  contrasena:{ type:String, required:true, select: false},
  singupDate: {type: Date, default : Date.now()},
  lastLogin: Date
})

UsuarioSchema.pre("save",function (next)  {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.contrasena, salt, null, (err, hash) => {
      if (err) return next(err)
      this.contrasena = hash
      next()
    })
  })
})

UsuarioSchema.methods.compareContrasena = 
function (candidateContrasena, cb)
 {
  bcrypt.compare(candidateContrasena, this.contrasena, (err, isMatch) => {
    cb(err, isMatch)
  });
}
module.exports = mongoose.model('Usuario', UsuarioSchema)