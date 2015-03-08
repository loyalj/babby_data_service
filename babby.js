// Load the Express package for to handle the HTTP stuff
var express = require('express');
var bodyParser = require('body-parser');

//Get this app party started
var app = express();

// setup the app to that POST requests are enabled
// without this.. no one can POST to the api
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load all our route related files
var Lists = require('./routes/lists');

// Get a router instance
var router = express.Router();

// Let's configure our router
with(router) {
    // Setup a basic middleware point for all requests to be captured
    use(function(req, res, next) {

        //res.header('Access-Control-Allow-Origin', 'http://wefoundlove.in');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');
        
        console.log(req.headers.origin);
        console.log("REQ: " + req.originalUrl);
        next(); // Express.js: move onto the next step in the route
    });

    // Return some basic info about the api when the root url is hit
    get('/', function(req, res) {
        res.json({ name: 'babby', version: '0'});
    });

    // Setup the individual Pilot routes
    with(router.route('/list/:id')) {
        get(Lists.getList)
    };

    with(router.route('/list/:id/:itemid')) {
        post(Lists.updateList)
    }
    
};

// Force all routes to use the base API url
app.use('/api/v0/', router);

// Launch the app
app.listen(3000);

console.log('BABBY V1.0.0');
console.log('Hey Babby!');
