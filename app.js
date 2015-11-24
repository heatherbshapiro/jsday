var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http');

var config = require('./config');

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

var MongoClient = require('mongodb').MongoClient;
// Connect to the db

// mongodb://<dbuser>:<dbpassword>@ds042128.mongolab.com:42128/MongoLab-a

// MongoClient.connect("mongodb://hshapiro93:5millie5@ds042128.mongolab.com:42128/MongoLab-a", function(err, db) {
//   if(!err) {
//     console.log("We are connected");
//   }
//   if(err) { return console.dir(err); }

//   var collection = db.collection('urls');
//   var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

//   collection.insert(docs, {w:1})
// });


module.exports = app;
