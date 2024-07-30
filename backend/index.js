const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const stripe = require('stripe')('STRIPE_SECRET_KEY');
const path = require('path');


const app = express()
const frontendURL = process.env.FRONTEND_URL || 'https://eldaapp-front.onrender.com';

app.use(cors({
    origin: frontendURL,
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
