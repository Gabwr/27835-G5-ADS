const { servicio_usuario } = require('../servicios/usuario_servicio');
const { generar_token } = require('../middleware/auth');
const bcrypt = require('bcrypt');
const pool = require('../../modelos/base_de_datos/db_pool');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = `
      SELECT * FROM usuario WHERE usuario_usuario = $1
    `;

    const { rows } = await pool.query(query, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    const isValidPassword = await bcrypt.compare(password, user.usuario_contrasenia);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const payload = {
      id: user.usuario_id,
      usuario: user.usuario_usuario,
      contrasenia: user.usuario_contrasenia
    };
    const token = generar_token(payload);
    
    res.json({ token, user: payload });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
  };

exports.update_user = async (req,res) => {
  const {id} = req.params;
  if (!id || id === undefined || id === null || id === '') {
    return res.status(400).json({ error: 'ID de usuario no proporcionado' });
  }
  try {
    const values = [id];
    const result = await UserServices.updateUser(values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}