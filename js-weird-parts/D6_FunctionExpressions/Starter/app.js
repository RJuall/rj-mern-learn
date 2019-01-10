var a;
function greet() {
    console.log('hi');
}
var anonymousGreet = function() {
    console.log('hi');
}

function log(a) {
    console.log(a);
}

log("Hello");

log({
    greeting: 'hi'
});

log(function() {
    console.log('hi');
});