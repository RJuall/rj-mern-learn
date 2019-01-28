// object properties and methods
const obj = {
    greet: 'Hello'
}
console.log(obj.greet);
console.log(obj['greet']);
const prop = 'greet';
console.log(obj[prop]);

// functions and arrays
const arr = [];
arr.push(() => {
    console.log('Hello World 1');
});
arr.push(() => {
    console.log('Hello World 2');
});
arr.push(() => {
    console.log('Hello World 3');
});
arr.forEach(item => item());