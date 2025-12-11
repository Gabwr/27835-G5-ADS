const { DataTypes } = require('sequelize');
const sequelize = require('../base_de_datos');
const bcrypt = require('bcrypt');

const Jaula = sequelize.define('jaula',{
  jaula_id: {
    type: DataTypes.STRING(32),
    primaryKey: true,
    allowNull: false,
  },
  jaula_tipo: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: false,
    field: 'jaula_tipo' 
  },
  jaula_capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'jaula_capacidad'
  }
}, {
  tableName: 'jaula',     
  timestamps: false
});


module.exports = Jaula;