var a = 3;
var b;

b = a;

console.log(a);
console.log(b);

a = 2;

console.log(a);
console.log(b);

var c = { greeting: 'hi' };
var d;

d = c;

console.log(c);
console.log(d);

d.greeting = "HELLO";

console.log(c);
console.log(d);

function changeGreeting(obj) {
    obj.greeting = "HOLA";
}

changeGreeting(c);

console.log(c);
console.log(d);

c = { greeting: 'hi' };

console.log(c);
console.log(d);