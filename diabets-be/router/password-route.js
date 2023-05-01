const passwordController = require('../controller/password-controller');
const express = require('express');
const router = express.Router();

router.post('/',passwordController.createPasswordQuestions);
router.get('/:id',passwordController.getPasswordQuestions);
router.put('/:userId',passwordController.updatePasswordQuestions);

module.exports = router;