const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const Dealer = require('../models/Dealer');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

const submitApplication = async (req, res) => {
  try {
    const { name, phone, email, aadharNumber, GSTNumber, PanNumber } = req.body;
    const file = req.file;

    if (!name || !phone || !email || !aadharNumber || !GSTNumber || !PanNumber || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Read the file data from the uploaded file
    const fileData = await fs.readFile(file.path);

    const newDealer = new Dealer({
      name,
      phone,
      email,
      aadharNumber,
      GSTNumber,
      PanNumber,
      fileData: fileData,
      fileType: file.mimetype
    });

    await newDealer.save();

    res.json({ message: 'Application submitted successfully!', dealer: newDealer });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAlldealer = async (req, res) => {
  try {
    const dealers = await Dealer.find();
    res.json(dealers);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDealerFile = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer || !dealer.fileData) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set('Content-Type', dealer.fileType);
    res.send(dealer.fileData);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  upload,
  submitApplication,
  getAlldealer,
  getDealerFile,
};
