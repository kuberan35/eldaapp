const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const stripe = require('stripe')('STRIPE_SECRET_KEY');
const path = require('path');

const app = express();
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
    origin: frontendURL,
    credentials: true,
}));

// app.set("trust proxy",1);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const cookieOptions = {
//     httpOnly: true, // Helps mitigate XSS attacks
//     secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
//     sameSite: 'None', // Allows cross-site cookie usage
// };

// // Example route where the cookie is set
// app.post('/set-token', (req, res) => {
//     const token = 'exampleToken'; // Replace with your token logic
//     res.cookie('token', token, cookieOptions);
//     res.json({ message: 'Token set in cookie' });
// });

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
