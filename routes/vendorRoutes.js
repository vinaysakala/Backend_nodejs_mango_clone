const vendorController = require('../controllers/vendercontroller');
const express = require('express');
const router = express.Router();


router.post('/register', vendorController.venderRegister);
router.post('/login', vendorController.venderLogin);

router.get('/all-vender', vendorController.getAllVenders);
router.get('/getvender/:id', vendorController.getVenderById);

module.exports = router;
