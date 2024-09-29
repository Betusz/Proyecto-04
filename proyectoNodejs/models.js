const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  contraseña: String,
});

const salaSchema = new mongoose.Schema({
  nombre: String,
  capacidad: Number,
  disponible: Boolean,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Sala = mongoose.model('Sala', salaSchema);

module.exports = { Usuario, Sala };
