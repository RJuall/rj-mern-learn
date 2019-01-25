// Your Javascript Code Goes Here
let firstname = 'Jane';

(function (lastname) {
    let firstname = 'John';
    console.log(firstname);
    console.log(lastname);
})('Doe');

console.log(firstname);