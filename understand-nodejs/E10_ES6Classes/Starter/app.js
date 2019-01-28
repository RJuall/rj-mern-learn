'use strict';

class Person {
    // Function constructor
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    // Methods are put on the prototype
    greet() {
        console.log(`Hello, ${this.firstname} ${this.lastname}`);
    }
}

var john = new Person('John', 'Doe');
john.greet();

var jane = new Person('Jane', 'Doe');
jane.greet();

console.log(john.__proto__); // Person {}
console.log(jane.__proto__); // Person {}
console.log(john.__proto__ === jane.__proto__); // true