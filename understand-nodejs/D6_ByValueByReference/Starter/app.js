// pass by value
function change(b) {
    b = 2;
}

var a = 1;
change(a); // 1
console.log(a);
let c = 1;
console.log(c); // 1

// pass by reference
function changeObj(d) {
    d.prop1 = function() {};
    d.prop2 = {};
}

var e = {};
e.prop1 = {};
console.log(e); // { prop1: {} }
changeObj(e);
console.log(e); // { prop1: [Function], prop2: {} }