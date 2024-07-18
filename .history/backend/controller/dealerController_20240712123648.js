// controllers/dealerController.js
const fs = require('fs');
const path = require('path');
const multer = require('multer')
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
  //   filename: (req, file, cb) => {
  //     cb(null, `${Date.now()}-${file.originalname}`);
  //   },
  // });
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});
  
  const upload = multer({ storage: storage });

// Handle form submission
const submitApplication = async (req, res) => {
  try {
    const { name, phone, email, aadharNumber, GSTNumber, PanNumber } = req.body;
    const file = req.file;

    if (!name || !phone || !email || !aadharNumber || !GSTNumber || !PanNumber || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newDealer = new Dealer({
      name,
      phone,
      email,
      aadharNumber,
      GSTNumber,
      PanNumber,
      filePath: file.path,
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
  

module.exports = {
    upload,
  submitApplication,
  getAlldealer,
};
