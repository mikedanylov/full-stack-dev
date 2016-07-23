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

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good,
                // save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // return an error if there is no token

    }
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

        if (err || !req.decoded._doc.admin) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        }

        console.log(req.decoded._doc);

        req.decoded = decoded;
        next();
    });
}