function greet(firstName, lastName, language) {

    // language = language || 'en';

    // if (arguments.length < 2) {
    //    console.log('Missing Parameters!');
    //    return;
    // }

    console.log(firstName);
    console.log(lastName);
    console.log(language);
    console.log(arguments);
    console.log('----------------');
}

greet();
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'en');