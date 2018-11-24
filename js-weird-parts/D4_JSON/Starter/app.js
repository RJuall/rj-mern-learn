var objectLiteral = {
    firstname: 'Mary',
    isAProgrammer: true
}

console.log(objectLiteral);

var JSONv = '{ "firstname" : "Mary", "isAProgrammer" : true}'

var jsonValue = JSON.parse(JSONv);

console.log(JSONv);
console.log(jsonValue);