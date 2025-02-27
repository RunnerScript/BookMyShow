const express = require('express');
const app = express();
const cors = require('cors')
const envSetup = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const authRouter = require('./src/routes/auth.routes');
const movieRouter = require('./src/routes/movie.routes');
const threatreRouter = require('./src/routes/theatre.route');
const showRouter = require('./src/routes/show.routes');

envSetup.config();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/api/users', authRouter);

app.use('/api/movies', movieRouter);

app.use('/api/theatres', threatreRouter);

app.use('/api/shows', showRouter);


app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port 8080`);
});