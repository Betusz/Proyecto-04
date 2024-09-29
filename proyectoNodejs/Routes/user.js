const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();

//Ruta de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

//Ruta de logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Sesión cerrada exitosamente' }); //Envio de mensaje
});

  //Busca el usuario por su nombre de usuario
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

  //Verifica la contraseña
  const isMatch = user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

  //Crea el token 
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    '12345', //clave secreta
    { expiresIn: '1h' }
  );
  
  res.cookie('token', token, { httpOnly: true }); //Guarda el token en una cookie
  res.json({ message: 'Login exitoso', token });
});

module.exports = router;
