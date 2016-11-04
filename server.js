"use strict";
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', (req, res, next)=>{
    //CORS headers
    res.header("Access-Control-Allow-Origin", "*"); //restrict it to the  required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //SET custom headers
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if(req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// Auth Middleware - THis will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is needed
app.all('/api/v1*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

//If no routes is matched by now, it must be  a 404
app.use((req, res, next)=>{
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

// Start the server
app.set('port', process.env.PORT || 3000);
const port = app.get('port');

app.listen(port, () => {
    console.info(`Express server listen on port ${port}`);
});
