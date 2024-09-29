const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./Routes/user');

const app = express();

//Conectar a la BDD
mongoose.connect('mongodb://localhost:27017/reservas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());


app.use(express.static(path.join(__dirname, 'public'))); 

//Usar las rutas definidas en routes/user.js
app.use('/api', userRoutes);

//Ruta para /login que servirá login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});
app.use('/api', require('./Routes/user'));//Asegúrate de que esta ruta esté configurada

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
