const express = require('express');
const app = express();
const envSetup = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

envSetup.config();
connectDB();

app.use(express.json());

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port 8080`);
});