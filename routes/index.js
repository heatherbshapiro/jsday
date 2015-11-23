var express = require('express');
var router = express.Router();
var config = require('../config');
var https = require('https');
var bodyParser = require('body-parser');
var twilio = require('twilio');


 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.get('/post', function(req, res, next) {
//   res.render('post');
// });

// router.post('/post', function(req,res){
//   res.render('post', postData(req.body.link));
// })

router.get('/response',function(req,res){
    var twiml = new twilio.TwimlResponse();
    twiml.message('Hello World!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

    
})

module.exports = router;

function postData(link) {

    var user = {
        link: link,
    };

    var userString = JSON.stringify(user);

    var headers = {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Content-Length': userString.length,
        'X-ZUMO-APPLICATION': config.appkey
    };

    var options = {
        host: config.mobileservices + '.azure-mobile.net',
        port: 443,
        path: '/tables/' + config.table,
        method: 'POST',
        headers: headers
    };

    // Setup the request.  The options parameter is
    // the object we defined above.
    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            var resultObject = JSON.parse(responseString);
        });
    });

    req.on('error', function (e) {
        // TODO: handle error.
    });

    req.write(userString);
    req.end();
}
