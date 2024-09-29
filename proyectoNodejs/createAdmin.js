const bcrypt = require('bcryptjs');
const User = require('./models/User'); 
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/reservas');

.then(() => {
  const hashedPassword = bcrypt.hashSync('adminpassword', 10);
  const admin = new User({
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  });
  return admin.save();
})
.then(() => {
  console.log('Usuario admin creado');
  mongoose.connection.close();
})
.catch(err => console.error(err));

