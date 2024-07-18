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

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('application/msword') || file.mimetype.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and document files are allowed!'));
    }
  }
});

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  gstNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  fileData: { type: Buffer, required: true }, // Ensure this is defined correctly
  fileType: { type: String, required: true }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

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
    const application = await Application.findById(req.params.id);
    if (!application || !application.fileData) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set('Content-Type', application.fileType);
    res.send(application.fileData);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  upload,
  handleFormSubmission,
  getAllApplications,
  getApplicationFile,
};
