const express = require('express');
const router = express.Router();
const controller = require('../controller/usuario_controller');
const {verificar_token} = require('../middleware/auth');

router.post('/login', controller.loginUser);

module.exports = router;