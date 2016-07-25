var express = require('express');
var promoRouter = express.Router();
var bodyParser = require('body-parser');

var Promotions = require('../models/promotions');
var Verify = require('./verify');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.find({}, function (err, promo) {
        if (err) {
            throw err;
        }
        res.json(promo);
    });
})

.post(Verify.verifyAdmin, function (req, res, next) {
    Promotions.create(req.body, function (err, promo) {
        if (err) {
            throw err;
        }
        res.json(promo);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Promotions.remove({}, function (err, resp) {
        if (err) {
            throw err;
        }
        res.json(resp);
    });
});

promoRouter.route('/:promotionId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.findById(req.params.leaderId, function (err, promo) {
        if (err) {
            throw err;
        }
        res.json(promo);
    });
})

.put(Verify.verifyAdmin, function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promo) {
        if (err) {
            throw err;
        }
        res.json(promo);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.promotionId, function (err, resp) {
        if (err) {
            throw err;
        }
        res.json(resp);
    });
});

module.exports = promoRouter;
