var User = require('../models/user');
 // used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token ||
                req.headers['x-access-token'];

    if (!token) {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }

    // verifies secret and checks exp
    jwt.verify(token, config.secretKey, function (err, decoded) {
        if (err) {
            err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        } else {
            // if everything is good,
            // save to request for use in other routes
            req.decoded = decoded;
            next();
        }
    });
};

exports.verifyAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token ||
                req.headers['x-access-token'];

    if (!token) {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }

    jwt.verify(token, config.secretKey, function (err, decoded) {

        if (err || !decoded || !decoded._doc.admin) {
            err = new Error('You are not authorizeded!');
            err.status = 403;
            return next(err);
        }

        console.log(decoded._doc);

        req.decoded = decoded;
        next();
    });
};
