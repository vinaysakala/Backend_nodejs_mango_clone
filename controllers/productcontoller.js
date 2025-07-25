const Firm = require('../model/Firm');
const Product = require('../model/Product'); // Ensure you have this model
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.fieldname}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });


const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : null;
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        const productExists = await Product.findOne({ productName, firm: firm._id });
        if (productExists) {
            return res.status(400).json({ message: "Product already exists in this firm" });
        }
        const product = new Product({
            productName, price, category, bestSeller, description, image, firm: firm._id
        });
        const savedProduct = await product.save();
        if (!Array.isArray(firm.product)) {
            firm.product = [];
        }
        firm.product.push(savedProduct._id);
        await firm.save();
        res.status(200).json({ message: "product successfully added", savedProduct });
    } catch (error) {
        res.status(501).json({ message: "Internal Error", error });
    }
}


const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        if (!firm.product || firm.product.length === 0) {
            return res.status(404).json({ message: "No products found for this firm" });
        }
        const restarantName= firm.firmName;
        const products = await Product.find({ firm: firmId });
        res.status(200).json({ message: "Products retrieved successfully", products: products, restarantName : restarantName });

    } catch (error) {
        res.status(501).json({ message: "Internal Error", error });
    }
}

const deleteProductById = async (req,res)=>{
    try{
        const productId=req.params.productId;
        const deleteProduct = Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({ message: "Product not found" });
        }

    }catch(error){
        res.status(501).json({ message: "Internal Error", error });
    }
}


module.exports = { addProduct: [upload.single('image'), addProduct] ,getProductByFirm,deleteProductById };
