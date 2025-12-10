function sanitize(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function updateUser(values) { 
    const query = 'UPDATE usuario SET profiles_id = $1 WHERE users_id = $2'
    ;
    return await pool.query(query, values)
}