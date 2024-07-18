// models/Dealer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealerSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    aadharNumber: { type: String, required: true },
    GSTNumber: { type: String, required: true },
    PanNumber: { type: String, required: true },
    fileData: { type: Buffer, required: true }, // Store the file as binary data
    fileType: { type: String, required: true }  // Store the file's MIME type
});

module.exports = mongoose.model('Dealer', DealerSchema);
