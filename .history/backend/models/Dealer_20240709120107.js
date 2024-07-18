// models/Dealer.js
const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  aadharNumber: String,
  GSTNumber: String,
  PanNumber: String,
  filePath: String,
});

module.exports = mongoose.model('Dealer', dealerSchema);
