var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

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


var accountSid = 'ACdf61bb67eb9d93e0eccbd760b293bd75'; 
var authToken = '61406275dc894bb906084f4c5a4a05c9'; 
var twilio= require('twilio');
var resp = new twilio.TwimlResponse();
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 

client.sendMessage({
    to:'+17326103947', // the number for the phone in your pocket
    from:'+18482060215', // your Twilio number
    body:'I love you!' // The body of the text message
}, function(error, message) {
    // This callback is executed when the request completes
    if (error) {
        console.error('Dagnabit.  We couldn\'t send the message');
    } else {
        console.log('Message sent! Message id: '+message.sid);
    }
});

resp.message("Thank you for your text"); 
console.log(resp.toString());

module.exports = app;
