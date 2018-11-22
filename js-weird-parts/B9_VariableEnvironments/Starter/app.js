function b() {
    var myVar;
    console.log("b: " + myVar)
}

function a() {
    var myVar = 2;
    b();
    console.log("a: " + myVar)

}

var myVar = 1;
a();
console.log("Global: " + myVar)