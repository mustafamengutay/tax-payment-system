const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/admin', adminRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const errors = error.array;
    res.status(statusCode).json({
        message,
        errors,
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Server is running!');
        app.listen(3000);
    })
    .catch(error => {
        console.log('Server Connection Error!');
        console.log(error);
    });

