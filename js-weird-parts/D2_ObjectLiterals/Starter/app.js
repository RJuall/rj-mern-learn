var robPerson = {
    firstName: 'Rob',
    lastName: 'Juall',
    address: {
        street: '111 Main St.',
        city: 'New York',
        state: 'NY',
        zip: 10001
    }
};

console.log(robPerson);

function greet(person) {
    console.log('Hi ' + person.firstName);
}

greet(robPerson);

greet({
    firstName: 'Mary',
    lastName: 'Doe'
});