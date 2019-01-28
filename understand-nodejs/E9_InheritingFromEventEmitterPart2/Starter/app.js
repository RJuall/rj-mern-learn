var EventEmitter = require('events');
var util = require('util');

function Greetr() {
	// Analogous to a super constructor
	// Adds the greeting property to EventEmitter
	EventEmitter.call(this);
	this.greeting = 'HELLO WORLD';
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function() {
	console.log(this.greeting);
	this.emit('greet');
}

var greeter1 = new Greetr();

greeter1.on('greet', function() {
	console.log('Someone GREETED');
});

greeter1.greet();