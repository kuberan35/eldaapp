const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Application = require('../models/Application');

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

const handleFormSubmission = async (req, res) => {
  try {
    const { name, email, aadharNumber, gstNumber, panNumber, phone, address } = req.body;
    const file = req.file;

    if (!name || !email || !aadharNumber || !gstNumber || !panNumber || !phone || !address || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newApplication = new Application({
      name,
      email,
      aadharNumber,
      gstNumber,
      panNumber,
      phone,
      address,
      fileData: fileData,
      fileType: file.mimetype  
    });

    await newApplication.save();

    res.json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getApplicationFile = async (req, res) => {
  try {
    const applications = await Application.findById(req.params.id);
    if (!applications || !applications.fileData) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set('Content-Type', applications.fileType);
    res.send(applications.fileData);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  upload,
  handleFormSubmission,
  
  getAllApplications,

  getApplicationFile
};
