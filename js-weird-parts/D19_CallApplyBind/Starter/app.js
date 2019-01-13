var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
}

var logName = function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName());
}

var logName2 = function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName());
}.bind(person)

var logPersonName = logName.bind(person);

// logName();
logPersonName();
logName2(person);

// Function borrowing

var person2 = {
    firstname: 'Jane',
    lastname: 'Doe'
};

console.log(person.getFullName.apply(person2));

// Function currying

function multiply(a, b) {
    return a * b;
}

var multipleByTwo = multiply.bind(this, 2);
console.log('Mult by 2: ' + multipleByTwo(10));