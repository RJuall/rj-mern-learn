// Function statement
function greet(name) {
    console.log('Hello ' + name);
}
greet('Rob');

// Using a function expression
var greetFunc = function(name) {
    console.log('Hello ' + name);
}
greetFunc('Robbo');

// Using an Immediately Invoked Function Expression (IIFE)
var greeting = function(name) {
    console.log('Hello ' + name);
}('Robbito');

// Valid expressions
3;
"I am a string";
{ name: "Rabbit" };

// IIFE as a standalone fn expression
// Parens are necessary to tell the syntax parser
//  that the fn is an expression not a statement
(function(name) {
    console.log('Hello ' + name);
}('Rabbit'));

