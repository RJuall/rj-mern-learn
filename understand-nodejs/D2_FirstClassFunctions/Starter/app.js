// Your Javascript Code Goes Here
function greet() {
    console.log('HELLO!');
}
greet();

// functions are first class
function logGreeting(fn) {
    fn();
}
logGreeting(greet);

// function expression
var greetMe = function() {
    console.log('HELLO FN EXPRESSION');
}
greetMe();
logGreeting(greetMe);

// using a fn expression on the fly
logGreeting(() => {
    console.log('HELLO FROM ARROW FN')
});