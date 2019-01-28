const Emitter = require('./emitter');
const emtr = new Emitter();
emtr.on('greet', () => console.log('HELLO 1'))
emtr.on('greet', () => console.log('HELLO 2')); 
emtr.emit('greet');