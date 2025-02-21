const express = require('express');
const app = express();
const cors = require('cors')
const envSetup = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth.routes');

envSetup.config();

connectDB();

app.use(cors())
app.use(express.json());

authRoutes(app);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port 8080`);
});