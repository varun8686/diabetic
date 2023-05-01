const userController = require('../controller/user-controller');
const express = require('express');
const router = express.Router();

router.post('/',userController.createUser);

//router.post('/validate',userController.checkUserStatus);
router.post('/verify',userController.readUser);

router.post('/login',userController.checkUserPassword);

router.put('/:id',userController.changePassword);
router.put('/image/:id',userController.changeImageIndex);

module.exports = router;