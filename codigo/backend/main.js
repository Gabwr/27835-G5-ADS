const port = 3001;
const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize');

require('dotenv').config();
const sequelize = require('./modelos/base_de_datos/sequelize');
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sistema conectado a PostgreSQL Database');
  } catch (error) {
    console.error('No fue posible hacer la conexión:', error);
  }
})();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const rutas_usuario = require('./controlador/rutas/usuario_rutas');
const rutas_jaula = require('./controlador/rutas/jaula_rutas');

app.use('/usuario',rutas_usuario);
app.use('/jaula',rutas_jaula);

app.listen(port,() => console.log("Sistema corriendo en --> "+port));