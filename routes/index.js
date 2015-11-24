var express = require('express');
var router = express.Router();
var https = require('https');
var bodyParser = require('body-parser');
var twilio= require('twilio');

var accountSid = process.env.ACCOUNTSID; 
var authToken = process.env.AUTHTOKEN; 

 var accountSid = 'ACdf61bb67eb9d93e0eccbd760b293bd75'; 
 var authToken = '61406275dc894bb906084f4c5a4a05c9'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

var validUrl = require('valid-url');

var url = "hello"

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var MongoClient = require('mongodb').MongoClient;

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
var t = 'google.com';
  if (t.match(regex) )
 {
   console.log("Successful match");
 } else {
   console.log("No match");
 }
 
router.get('/response',function(req,res){
    client.messages.list(function(err,data){
        var messages = data.messages[0];
        console.log(messages.body);
        if ((messages.body).match(regex)){
            MongoClient.connect("mongodb://hshapiro93:5millie5@ds042128.mongolab.com:42128/MongoLab-a", function(err, db) {
                if(!err) {
                    console.log("We are connected");
                }
                if(err) { return console.dir(err); }
            
                var collection = db.collection('urls');
                var docs = [messages];
                
                console.log(db.collection('urls'));
                collection.insert(docs, {w:1})
            });
            var twiml = new twilio.TwimlResponse();
            twiml.message(messages.body);
    
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString()); 
        }
        else{
         var twiml = new twilio.TwimlResponse();
         twiml.message("Please enter a valid URL");

         res.writeHead(200, {'Content-Type': 'text/xml'});
         res.end(twiml.toString()); 
        } 
   });
});

module.exports = router;

