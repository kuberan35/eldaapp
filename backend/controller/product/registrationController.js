const path = require('path');
const fs = require('fs');
const Registration = require('../../models/register');
const multer = require('multer');
// const nodemailer = require('nodemailer');
const transporter = require('../../config/nodemailerConfig');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// // Email setup
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password',
//   },
// });

const registerProduct = async (req, res) => {
  const formData = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File upload is required' });
  }

  console.log('Form Data:', formData);
  console.log('File:', file);

  try {
    const registration = new Registration({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      orderNumber: req.body.orderNumber,
      serialNumber: req.body.serialNumber,
      installationDate: req.body.installationDate,
      fileUpload: req.file.path,
    });

    await registration.save();
    const email = req.body;
    // Send email to admin
    const mailOptions = {
      from: email,
      to: 'mediaexecutive2.apd@gmail.com',
      subject: 'New Product Registration',
      text: `A new product registration has been submitted. Here are the details:\n
             Name: ${req.body.name}\n
             Phone: ${req.body.phone}\n
             Email: ${req.body.email}\n
             Order Number: ${req.body.orderNumber}\n
             Serial Number: ${req.body.serialNumber}\n
             Installation Date: ${req.body.installationDate}\n
             File: ${req.file.path}`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });

    res.status(200).send('Registration successful');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  registerProduct,
  upload,
};
