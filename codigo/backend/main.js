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


app.listen(port,() => console.log("Sistema corriendo en --> "+port));