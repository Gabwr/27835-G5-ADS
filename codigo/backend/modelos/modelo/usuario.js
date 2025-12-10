const { DataTypes } = require('sequelize');
const sequelize = require('../base_de_datos');
const bcrypt = require('bcrypt');

const usuario = sequelize.define('ususario',{
  usuario_id: {
    type: DataTypes.STRING(32),
    primaryKey: true,
    allowNull: false,
  },
  usuario_usuario: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
    field: 'usuario_usuario' 
  },
  usuario_contrasenia: {
    type: DataTypes.STRING(64),
    allowNull: false,
    field: 'usuario_contrasenia'
  }
}, {
  tableName: 'usuario',     
  timestamps: false,       
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.usuario_contrasenia) {
        const saltRounds = 10;
        usuario.usuario_contrasenia = await bcrypt.hash(usuario.usuario_contrasenia, saltRounds);
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('usuario_contrasenia')) {
        const saltRounds = 10;
        usuario.usuario_contrasenia= await bcrypt.hash(usuario.usuario_contrasenia, saltRounds);
      }
    }
  }
});

Usuario.prototype.validarContrasenia = async function(contrasenia) {
  return await bcrypt.compare(contrasenia, this.usuario_contrasenia);
};

module.exports = Usuario;