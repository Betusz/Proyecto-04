const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//verificar el token
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, 'secret_key');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token no válido' });
  }
}

//verifica si el usuario es admin
function verifyAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No tienes acceso' });
  }
  next();
}

// Ruta protegida para los administradores
router.get('/admin', verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: 'Bienvenido Admin' });
});

module.exports = router;
