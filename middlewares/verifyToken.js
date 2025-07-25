const vender = require('../model/vendor');  
const jwt = require('jsonwebtoken');    
const dotenv = require('dotenv');

dotenv.config();

const secretkey = process.env.jwsToken

const verifyToken = async (req, res, next) => {
     const token = req.headers['token'];
     if(!token) {
         return res.status(401).json({ message: "No token provided" });
     }try{
            const decoded = jwt.verify(token, secretkey);
            const vendor = await vender.findById(decoded.vendorid);
            if(!vendor) {
                return res.status(404).json({ message: "Vendor not found" });
            }
            req.vendorid = vendor._id; // Attach the vendor to the request object
            next(); // Proceed to the next middleware or route handler
     }catch (error) {
         return res.status(500).json({ message: "Internal server error", error });
     }
}

module.exports = verifyToken;
