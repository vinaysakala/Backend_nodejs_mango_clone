const Firm = require('../model/Firm');
const Vender = require('../model/vendor');
const multer = require('multer');
const path = require('path'); // You missed this import

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

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : null;

    const vendorId = await Vender.findById(req.vendorid);
    if (!vendorId) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vender: vendorId._id
    });

    const saveFirm = await firm.save();
    vendorId.firm.push(saveFirm._id);
    await vendorId.save();

    return res.status(201).json({ message: "Firm added successfully", firm });
  } catch (error) {
    console.error("Error adding firm:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deleteFirm = await Firm.findByIdAndDelete(firmId);
    if (!deleteFirm) {
      return res.status(404).json({ message: "Firm not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

// Export controller with multer middleware
module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById };
