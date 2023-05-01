const mailController = require('../controller/mail-controller');
const express = require('express');
const router = express.Router();

router.post('/',mailController.sendPasswordResetEmail);


module.exports = router;