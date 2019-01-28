'use strict';

var EventEmitter = require('events');
const Greetr = require('./greetr');

var greeter1 = new Greetr();

greeter1.on('greet', function(data) {
	console.log('Someone GREETED: ' + data);
});

greeter1.greet('Robert');