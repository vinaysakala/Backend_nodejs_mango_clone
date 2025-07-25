const express = require('express');
const productcontroller = require('../controllers/productcontoller');
const router = express.Router();

router.post('/add-product/:firmId', productcontroller.addProduct);
router.get('/:firmId/products', productcontroller.getProductByFirm); 
router.delete('/delete/:productId', productcontroller.deleteProductById);

router.get('/uploads/:filename', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('content-type', 'image/jpeg');  
    res.sendFile(path.join(__dirname, '../uploads', imageName), (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(404).send('File not found');
        }
    });
});

module.exports = router;
