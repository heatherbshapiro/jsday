var express = require('express');
var router = express.Router();
var config = require('../config');
var https = require('https');
var bodyParser = require('body-parser');
var twilio= require('twilio');

var accountSid = process.env.ACCOUNTSID; 
var authToken = process.env.AUTHTOKEN; 

//var accountSid = 'ACdf61bb67eb9d93e0eccbd760b293bd75'; 
//var authToken = '61406275dc894bb906084f4c5a4a05c9'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var MongoClient = require('mongodb').MongoClient;

router.get('/response',function(req,res){
    console.log("here");
    MongoClient.connect("mongodb://hshapiro93:5millie5@ds042128.mongolab.com:42128/MongoLab-a", function(err, db) {
     if(!err) {
         console.log("We are connected");
     }
     if(err) { return console.dir(err); }

     var collection = db.collection('urls');
     var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

     collection.insert(docs, {w:1})
    });
     var twiml = new twilio.TwimlResponse();
     twiml.message('Hello World!');

     res.writeHead(200, {'Content-Type': 'text/xml'});
     res.end(twiml.toString());  
});

module.exports = router;

