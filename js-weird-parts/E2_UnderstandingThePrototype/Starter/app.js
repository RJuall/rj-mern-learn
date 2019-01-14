var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullname: function() {
        return this.firstname + ' ' + this.lastname;
    }
}

var john = {
    firstname: 'John',
    lastname: 'Doe'
}

// Don't do this EVER!
// For demo purposes only!
john.__proto__ = person;
console.log(john.getFullname());

var jane = {
    firstname: 'Jane'
}
jane.__proto__ = person;
console.log(jane.getFullname());