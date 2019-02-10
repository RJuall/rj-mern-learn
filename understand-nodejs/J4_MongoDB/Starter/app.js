var express = require('express');
var app = express();
const mongoose = require('mongoose');

mongoose.connect('LOREM');

const Schema = mongoose.Schema;

const personSchema = new Schema({
	firstname: String,
	lastname: String,
	address: String
});

// Essentially a function constructor
const Person = mongoose.model('Person', personSchema);

// Instantiating the Mongoose object
const john = Person({
	firstname: "John",
	lastname: "Doe",
	address: "555 Main St."
});

// Save 'john' to the database
john.save(function(err) {
	if (err) throw err;
	console.log("Person Saved!");
});

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	// Get all the users
	Person.find({}, function(err, users) {
		if (err) throw err;
		// Object of all the users
		console.log(users);
	})

	next();
});

htmlController(app);

apiController(app);

app.listen(port);