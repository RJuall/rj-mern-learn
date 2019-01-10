var arrE = new Array();
var arrL = [];

var arr = [
    1,
    false,
    {
        name: 'Rob',
        address: '111 Main St',
    },
    function(name) {
        var greeting  = 'Hello';
        console.log(greeting + ' ' + name);
    },
    "HELLO"
];

console.log(arr);
arr[3](arr[2].name);