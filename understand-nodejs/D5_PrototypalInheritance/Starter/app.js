// Your Javascript Code Goes Here
function Person(firstname, lastname) {
    this.lastname = lastname;
    this.firstname = firstname;

}

Person.prototype.greet = function() {
    console.log(`Hello, ${this.firstname} ${this.lastname}`);
}

let john = new Person('John', 'Doe');
console.log(john.firstname + ' ' + john.lastname);
john.greet();
let jane = new Person('Jane', 'Doe');
jane.greet();

console.log(john.__proto__);
console.log(jane.__proto__);