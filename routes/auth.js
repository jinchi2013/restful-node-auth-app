"use strict";
const jwt = require('jwt-simple');

var auth = {
    login: (req, res) => {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username === '' || password === '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        //Fire a query to you DB and check if the credentials are valid
        var dbUserObj = this.validate(username, password);

        if(!dbUserObj) {
            //If authentication fails, we send a 401 back
            res.status(401);
            res.join({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        } else {
            res.json(genToken(dbUserObj));
        }
    },
    validate: (username, password) => {
        var dbUserObj = {
            name: 'cj',
            role: 'admin',
            username: 'cj@user.com'
        };
        return dbUserObj;
    },
    validateUser: (username)=>{
        var dbUserObj = {
            name: 'cj',
            role: 'admin',
            username: 'cj@user.com'
        };
        return dbUserObj;
    }
};

function genToken(user) {
    var expires = expiresIn(7);
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;