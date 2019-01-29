const fs = require('fs');
// readFileSync is synchronous, blocking
const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);
// readFile is asynchronous and accepts a callback
const greet2 = fs.readFile(__dirname + '/greet.txt', (err, data) => {
    console.log(data);
    // <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21>
});
const greet3 = fs.readFile(__dirname + '/greet.txt', 'utf8', (err, data) => {
    console.log(data);
    // Hello world!
});
console.log('DONE'); // logs before async callbacks
