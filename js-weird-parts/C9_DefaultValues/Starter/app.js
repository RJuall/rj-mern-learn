var a = 0;

if (a || a === 0) {
    console.log("Something is there.");
} else {
    console.log("Nothing");
}

function greet(name) {
    name = name || '<Your name here>';
    console.log ('Hello ' + name);
}

greet('Rob');

greet();

