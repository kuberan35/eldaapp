const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Application = require('../models/Application');

// Set up Multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage to store files in memory

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
      fileData: file.buffer, // Use file.buffer to store the file data
      fileType: file.mimetype  // Store the file type
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
