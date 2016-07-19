var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assert = require('assert');

var routes = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');

var app = express();

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        image: 'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: '$4.60',
        description: 'A unique...',
        comments: [
            {
                rating: 5,
                comment: "Imagine all the eatables, living in conFusion!",
                author: "John Lemon"
            },
            {
                rating: 4,
                comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author: "Paul McVites"
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        Dishes.find({}, function (err, dishes) {
            if (err) throw err;

            console.log(dishes);
            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });

    // create a new dish
    Promotions.create({
        name: 'Weekend Grand Buffet',
        image: 'images/buffet.png',
        label: 'New',
        price: '$19.99',
        description: 'Featuring...'
    }, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);

        Promotions.find({}, function (err, promotions) {
            if (err) throw err;

            console.log(promotions);
            db.collection('promotions').drop(function () {
                db.close();
            });
        });
    });
});


module.exports = app;
