const express = require('express');
const router = express.Router();
const controller = require('../controller/usuario_controller');


router.post('/login', controller.login_user);
router.put('/update/:id',controller.update_user)
module.exports = router;