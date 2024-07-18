const transporter = require('../../config/nodemailerConfig');
const Contact = require('../../models/Contact');

const sendContactMessage = async (req, res) => {
  const { name, email, message, phone } = req.body;

  const mailOptions = {
    from: email,
    to: 'jkuberan758@gmail.com',
    subject: `Message from ${name}`,
    text: `${message}\n\nFrom,\n${name}\n${email}\nPhone: ${phone}`,
  };

  try {
    // Save contact message to the database
    const contact = new Contact({ name, email, message, phone });
    await contact.save();

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send message. Please check the server logs for more details.' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Message sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ error: 'Failed to save contact message. Please check the server logs for more details.' });
  }
};

module.exports = { sendContactMessage };
