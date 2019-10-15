// create express variable - importing express
const express = require('express');

// executing express like a function to use utility/methods of express
const app = express();

// logging files by importing morgan
const morgan = require('morgan');

// import body-parser
const bodyParser = require('body-parser');

// import cards.js information
const cardRoutes = require('./api/routes/cards');

// setting up morgan before calling routes
app.use(morgan('dev'));

// setting up body-parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// setting up the headers for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// setting up the middleware
app.use('/cards', cardRoutes);

// handling errors unhandled by routes
app.use((req, res, next) => {
    console.log('res ----> ', res.statusMessage);
    const message = (res.statusMessage) ? res.statusMessage : 'Bad Request!!!';
    const error = (res.statusCode === 400) ? new Error(message) : new Error('Not Found!!!');
    error.status = res.statusCode || 404;
    next(error);
});

// handling errors from anywhere in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

// expose app as module
module.exports = app;