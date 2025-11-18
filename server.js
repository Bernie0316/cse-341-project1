require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {console.log(`Running on port ${PORT}`);});
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });