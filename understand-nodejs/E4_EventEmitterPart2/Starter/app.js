const Emitter = require('events');
const eventConfig = require('./config').events;
const emtr = new Emitter();

emtr.on(eventConfig.GREET, () => console.log('Someone said HELLO'));
emtr.on(eventConfig.GREET, () => console.log('A GREETING occurred.'));

console.log('HELLO');
emtr.emit(eventConfig.GREET);