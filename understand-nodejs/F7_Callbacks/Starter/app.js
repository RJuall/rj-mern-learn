function greet(callback) {
    console.log('HELLO WORLD');
    callback();
}
greet(() => console.log('CALLBACK HAPPENED'));
greet(() => console.log('DIFFERENT CALLBACK'));