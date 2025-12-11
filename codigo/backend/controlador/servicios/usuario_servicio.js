
function sanitize(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function actualizar_usuario(values) { 
    const query = 'UPDATE usuario SET usuario_contrasenia = $1 WHERE usuario_id = $2'
    ;
    return await pool.query(query, values)
}

const usuario_servicio = {
  sanitize,
  actualizar_usuario
}

module.exports = { usuario_servicio};