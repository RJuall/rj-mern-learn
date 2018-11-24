var person = new Object();

// Primitive type, property
person["firstName"] = "Rob";
person["lastName"] = "Juall";

var firstNameProperty = "firstName";

console.log(person);
console.log(person[firstNameProperty]);

console.log(person.firstName);
console.log(person.lastName);

person.address = new Object();
person.address.street = "111 Main St.";
person.address.city = "New York";
person.address.state = "New York";

console.log(person.address.street);
console.log(person.address);