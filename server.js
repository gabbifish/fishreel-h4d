'use strict';



var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


app.use(express.static(__dirname));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var PythonShell = require('python-shell');

app.get('/app/associated-accounts/:username', function (request, response) {
    PythonShell.run('pipl-request.py', {args:[request.params.username]}, function (err, results) {
        console.log("fetching associated accounts");
        if (err) throw err;
        console.log(JSON.stringify(results));
        response.status(200).send(JSON.stringify(results));
    });
});

app.get('/app/twitter_behavior/:username', function (request, response) {
    PythonShell.run('evaluate_user.py', {args:[request.params.username]}, function (err, results) {
        console.log("fetching twitter data about individual user");
        console.log(err);
        if (err) {
            response.status(400).send("No account found with that name");
        } else {
            response.status(200).send(results);
        };
    });
    
});

app.get('/app/twitter_user_exists/:username', function (request, response) {
    PythonShell.run('account_exists.py', {args:[request.params.username]}, function (err, results) {
        console.log("checking if user exists");
        if (err) {
            response.status(400).send("No account found with that name");
        } else {
            response.status(200).send(results);
        };
    });
    
});

// listen (start app with node server.js) ======================================
app.get('/', function(req, res) {
        res.sendFile(__dirname + '/app/index.html'); 	// load the single view file (angular will handle the page changes on the front-end)
});


app.listen(9000);
console.log("App listening on port 9000");