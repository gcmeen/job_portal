const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const errorController = require('./controllers/error');

const MONGODB_URI = require('./config/config').MONGODB_URI
const PORT = require('./config/config').PORT

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use(errorController.error500);

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true , useUnifiedTopology:true})
    .then(result => {
        console.log('connect success');
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    })