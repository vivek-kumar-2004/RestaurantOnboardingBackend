const express = require('express');
const cors=require('cors');
require("dotenv").config();


const app = express();

// Middleware
app.use(cors({
    origin: "*",
  }));
app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurant', require('./routes/restaurants'));


// Connect to MongoDB
const connectDB=require("./config/db")
connectDB();


const cloudinaryconnection=require("./config/cloudinary");
cloudinaryconnection();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
