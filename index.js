const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoute');

const path = require('path');

const app = express();

const port = process.env.port || 5000;

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('database connected'))
    .catch((e) => console.log(e, 'error'))

app.use(express.json())
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


app.use('/', (req, res) => {
    res.send('Welcome to the backend server');
});
