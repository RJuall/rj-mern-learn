function greet(whatToSay) {
    return function(name) {
        console.log(whatToSay + ' ' + name);
    }
}

greet('Hi')('Rob');

var sayHi = greet('Hi');
sayHi('Robbo');