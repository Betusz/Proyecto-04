const express = require('express');
const mongoose = require('mongoose');
const { Usuario, Sala } = require('./models');
const app = express();
app.use(express.json());

//Conexión a la BDD
mongoose.connect('mongodb://localhost:27017/reservas');

app.get('/', (req, res) => {
    res.send('Bienvenido al sistema de reservas de salas');
  });

//GET:LISTA TODOS LOS USUARIOS
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

//GET:LISTAR TODAS LAS SALAS
app.get('/salas', async (req, res) => {
  const salas = await Sala.find();
  res.json(salas);
});

//GET:LISTA LA INFO DE UN USUARIO
app.get('/usuarios/:id', async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  res.json(usuario);
});

//GET:OBTENER INFO DE UNA SALA ESPECIFICA
app.get('/salas/:id', async (req, res) => {
  const sala = await Sala.findById(req.params.id);
  if (!sala) return res.status(404).send('Sala no encontrada');
  res.json(sala);
});

//POST:CREAR NUEVO USUARIO
app.post('/usuarios', async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.status(201).json(nuevoUsuario);
});

//POST:AGREGAR NUEVA SALA
app.post('/salas', async (req, res) => {
  const nuevaSala = new Sala(req.body);
  await nuevaSala.save();
  res.status(201).json(nuevaSala);
});

//PUT:ACTUALIZAR INFORMACIÓN DE USUARIO
app.put('/usuarios/:id', async (req, res) => {
  const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!usuarioActualizado) return res.status(404).send('Usuario no encontrado');
  res.json(usuarioActualizado);
});

//PUT:ACTUALIZA INFORMACIÓN DE SALA
app.put('/salas/:id', async (req, res) => {
  const salaActualizada = await Sala.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!salaActualizada) return res.status(404).send('Sala no encontrada');
  res.json(salaActualizada);
});

//DELETE:ELIMINAR UN USUARIO
app.delete('/usuarios/:id', async (req, res) => {
  const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
  if (!usuarioEliminado) return res.status(404).send('Usuario no encontrado');
  res.json({ message: 'Usuario eliminado' });
});

//DELETE:ELIMINAR UNA SALA
app.delete('/salas/:id', async (req, res) => {
  const salaEliminada = await Sala.findByIdAndDelete(req.params.id);
  if (!salaEliminada) return res.status(404).send('Sala no encontrada');
  res.json({ message: 'Sala eliminada' });
});

//servidor principal 
const path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); 

//página de inicio (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
