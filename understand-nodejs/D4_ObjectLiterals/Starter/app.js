// Your Javascript Code Goes Here
const person = {
    firstname: 'John',
    lastname: 'Doe',
    greet() {
        console.log(`Hello, ${this.firstname} ${this.lastname}`);
    }
}
person.greet();
// Can access object properties with brackets
person['greet']();