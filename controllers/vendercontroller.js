const Vender = require('../model/vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const secretkey = process.env.jwsToken

const venderRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const venderEmail = await Vender.findOne({ email });
        if (venderEmail) {
            return res.status(404).json("Email Already Exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newVender = new Vender({
            username,
            email,
            password: hashedPassword
        })
        await newVender.save();
        res.status(200).json({ message: "Vendor registered successfully" });
        console.log("Vendor rergister Successfully")
    } catch (e) {
        res.status(500).json({ message: "internal error", error: e })
    }
}

const venderLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vender = await Vender.findOne({ email });
        if (vender) {
            const isMatch = await bcrypt.compare(password, vender.password);
            if (!isMatch) {
                return res.status(400).json("Invalid Password or username");
            }
            const token = jwt.sign({ vendorid: vender._id }, secretkey, { expiresIn: '1h' });
            return res.status(200).json({
                message: "Login successful",
                token,
                vender: {
                    id: vender._id,
                    username: vender.username,
                    email: vender.email
                }
            });
        } else {
            return res.status(404).json("Email not found");
        }

    } catch (e) {
        return res.status(500).json({ message: "internal error", error: e });
    }
}

const getAllVenders = async (req, res) => {
    try {
        const vendors = await Vender.find().populate('firm');
        res.json({ vendors });
    } catch (error) {
        console.error("Error fetching vendors:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const getVenderById = async (req, res) => {
    const venderId = req.params.id;
    try {
        const vendor = await Vender.findById(venderId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }  
        res.status(200).json({ vendor });         
    } catch (error) {
        console.error("Error fetching vendor by ID:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}



module.exports = { venderRegister, venderLogin, getAllVenders,getVenderById };