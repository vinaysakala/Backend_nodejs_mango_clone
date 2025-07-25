const express = require('express');
const firmController = require('../controllers/firmcontrollers');
const verifyToken = require('../middlewares/verifyToken');
const { route } = require('./productRoute');
const router = express.Router();

router.post('/add-firm', verifyToken, firmController.addFirm);

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

router.delete('/delete/:firmId', firmController.deleteFirmById);

module.exports = router;
