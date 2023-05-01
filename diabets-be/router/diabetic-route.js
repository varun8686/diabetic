const diabeticController = require('../controller/diabetic-controller');
const express = require('express');
const router = express.Router();

router.post('/',diabeticController.createDiabetic);
router.get('/:userId',diabeticController.readDiabetic);
router.put('/:userId',diabeticController.updateDiabetic);


module.exports = router;