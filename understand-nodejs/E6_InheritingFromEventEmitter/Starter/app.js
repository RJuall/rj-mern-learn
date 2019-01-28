const EventEmitter = require('events');
const util = require('util');

function Greetr() {
    this.greeting = 'HELLO WORLD';
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function(data) {
    console.log(this.greeting + ': ' + data);
    this.emit('greet', data);
}

const greeter1 = new Greetr();

greeter1.on('greet', (data) => console.log('Someone GREETED: ' + data));
greeter1.greet('Robert');