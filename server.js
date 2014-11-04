/**** dependencies set up ****/
var express = require('express');
var app = express();                            // create app with express
var port = process.env.PORT || 8082;
var morgan = require('morgan');                  // log requests to console
var bodyParser = require('body-parser');        // pul information from HTML POSt
var methodOverride = require('method-override');// simulate DELETE and PUT



//set up our express application
app.use(express.static(__dirname + '/public')); //sets static files to the /public directory
app.set('views', __dirname + '/public/views');
app.use(morgan('dev')); //log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser()); //get information from html forms
app.use(methodOverride());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/**** routes ****/
require('./routes.js')(app); // load our routes and pass in our app and fully configured passport

/**** listen ****/
app.listen(port, function() {
  console.log("Node app is running at localhost:" + port);
});
