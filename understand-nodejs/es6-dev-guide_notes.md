# Learn and Understand NodeJs

## Anthony Alicea

### 1/23/19

### V8: The Javascript Engine

#### Conceptual Aside: Processors, Machine Language, and C++

Javascript is a high-level language that is abstracted far from machine language and the CPU

Node is written in C++

V8, the Javascript engine, is written in C++. Because Node adds onto V8, it is also written in C++

#### Javascript Aside: Javascript Engines and the ECMAscript Specification

ECMAscript: The standard that Javascript is based on. Standardized JS between the many JS engines.

V8 is one of many engines.

The ECMAscript specification describes exactly what JS is and what it is supposed to do.

A JS Engine: A program that converts JS code into something the computer processor can understand. Should follow the ECMAscript standard.

#### V8 Under the Hood

Google created V8 and it's open source.

It's performant, well-maintained, very large...

#### Adding Features to Javascript

V8 can run standalone, or can be embedded into any C++ application (such as Nodejs)

The C++ interface with JS extends the functionality of JS because C++ is much more fully-featured a programming language than JS, which was designed to run in the browser.

V8 binds C++ functions onto keywords that can then be written as if they were JS functions.

Anyone can write C++ functions and use V8 to bind them into JS run from that modified V8 engine.

Nodejs is a C++ program with V8 embedded that has added a bunch of functionality to JS to make it suitable for use as a server.

### The Node Core

#### Conceptual Aside: Servers and Clients

Nodejs is a server technology

Server: Computer that performs services

Client: Computer that asks for services (can also do work)

Client-Server model of computing--request, response

Famously the model of the internet, between browsers and web servers

Requests made in the form of http requests and responses

#### What Does Javascript Need to Manage a Server?

Node solves the problem is organizing JS code into reusable pieces

Node solves the problem of JS dealing with files

Node solves the problem of dealing with databases

Node solves the problem of communicating over the internet

Node allows JS to accept requests and send responses

Node gives JS a way to deal with work that takes a long time

#### The C++ Core

Nodejs was developed by a developer at a company called Joyent, which is still involved in its development

Nodejs _accepts_ JS and allows JS to accomplish things it would otherwise not be able to accomplish

#### The Javascript Core

Node is both a framework and a library of code

Most of the JS code in Node is a wrapper for the C++ code, but not all of it is. Some are JS utilities intended to make life easier for the developer.

#### Let's Install and Run Some Javascript in Node

As V8 gets updated, so must Node. At some point there was a fork of Node called io.js which updated much quicker than standard Node. Node and io.js eventually merged.

The way to run code through node is to point the Node executable to a .js file which it will execute.

### Modules, Exports, and Require

#### Conceptual Aside: Modules

Modules: A reusable block of code whose existence does not accidentally impact other code. JS did not have this feature when Node was developed (it does currently have this feature).

CommonJS Modules: An agreed upon standard for how code modules should be structured.

Node modules developed and adhere to the commonjs module standard.

#### Javascript Aside: First-Class Functions and Function Expressions

First-Class Functions: Everything that can be done with other types can also be done with functions. i.e. functions can be used like strings, numbers, etc. (pass them around, set variables equal to them, put them in arrays, etc.)

Expressions: A block of code that results in a value. Function expressions are possible in JS because functions are first-class.

Invoke: Run a function (also 'call').

```javascript
function greet() {
    console.log('HELLO!');
}
greet();

// functions are first class
function logGreeting(fn) {
    fn();
}
logGreeting(greet);

// function expression
var greetMe = function() {
    console.log('HELLO FN EXPRESSION');
}
greetMe();
logGreeting(greetMe);

// using a fn expression on the fly
logGreeting(() => {
    console.log('HELLO FROM ARROW FN')
});
```

#### Let's Build a Module

```javascript
// greet.js
const greet = function() {
    console.log('HELLO!');
}
module.exports = greet;
// app.js
const greet = require('./greet');
greet();
```

#### Javascript Aside: Objects and Object Literals

Name/Value Pair: A name which maps to a value. The name may be defined more then once, but only can have one value in any given *context*. That value may be more name/value pairs.

Object: A collection of name/value pairs (the simple definition).

Object Literal: Name/value pairs separated by commas and surrounded by curly braces. A quick, shorthand way of creating JS objects.

```javascript
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
```

#### Javascript Aside: Prototypal Inheritance and Function Constructors

Inheritance: One object gets access to the properties and methods of another object.

Every object in JS has a property that points to that object's prototype.

The "object prototype" is the base prototype of all JS objects

Function Constructors: A normal function that is used to construct objects. The `this` variable point to a new empty object and that object is returned from the function automatically.

```javascript
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
```

#### Javascript Aside: By Reference and By Value

Primitive: A type of data that represents a single value. Like a number or a string, not an object.

Passing primitives in JS is by value

Passing objects in JS is by reference

```javascript
// pass by value
function change(b) {
    b = 2;
}

var a = 1;
change(a); // 1
console.log(a);
let c = 1;
console.log(c); // 1

// pass by reference
function changeObj(d) {
    d.prop1 = function() {};
    d.prop2 = {};
}

var e = {};
e.prop1 = {};
console.log(e); // { prop1: {} }
changeObj(e);
console.log(e); // { prop1: [Function], prop2: {} }
```

#### Javascript Aside: Immediately Invoked Function Expressions (IIFEs)

IIFEs are a fundamental aspect of how modules work

Scope: Where in code you have access to a particular variable or function

IIFEs create their own scope, which means that variables will not collide.

Whatever variables are created within a function in JS are protected within their scope

```javascript
let firstname = 'Jane';

(function (lastname) {
    let firstname = 'John';
    console.log(firstname);
    console.log(lastname);
})('Doe');

console.log(firstname);
```

#### How Do Node Modules Really Work?: module.exports and require

In loading a module or file using the `request` syntax, Node doesn't simply load the code plainly, but it wraps it.

In Node 4.5, at least, the wrapper around the code (and the code as represented by `IMPORTED_CODE` is `'(function (exports, require, module, __filename, __dirname) {' + IMPORTED_CODE + '\n});'`

`require` is a function that a path is passed into.

`module.exports` is what the require functoin returns.

This works because your code is actually wrapped in a function that is given these things as functions parameters.

#### Javascript Aside: JSON

JSON: Javascript Object Notation. A standard for structuring data that is inspiried by Javascript object literals. JS engines are built to understand it.

#### More on `require`

When the `require` function looks for a file and doesn't find one, it then looks for a folder of the same name and tries to load an `index.js` file inside of it.

```javascript
// The index.js file can be used to organized a number of .js files
//  and returning them as an object so that they can be called 
//  individually
var english = require('./english');
var spanish = require('./spanish');

module.exports = {
    english: english,
    spanish: spanish
};
```

Node development relies heavily on modules and `require`.

#### Module Patterns

```javascript
// module.exports can be fed a function directly
module.exports = function() {
    console.log('HELLO WORLD');
};
// The module.exports object can have a function attached
module.exports.greet = function() {
    console.log("HELLO WORLD 2");
}
// This function can then be accessed by setting it to 
//  a variable name.
var greet2 = require('./greet2').greet;
greet2();
// The module.exports can instantiate a new object entirely
//  If this is used twice in the same code it will point to
//  the same object again, not create a new object.
function Greetr() {
    this.greeting = "HELLO WORLD 3";
    this.greet = function() {
        console.log(this.greeting);
    }
}
module.exports = new Greetr();
// If multiple different instantiations are required, 
//  module.exports can be set as the constructor, which
//  can then be called on to create multiple objects.
function Greetr() {
    this.greeting = "HELLO WORLD 4";
    this.greet = function() {
        console.log(this.greeting);
    }
}
module.exports = Greetr;
// Using this in code:
var greet4 = require('./greet4');
var grtr = new greet4();
grtr.greet();
// The module.export can be structured in such a way
//  to limit access to properties and methods
var greeting = 'HELLO WORLD 5';
function greet() {
    console.log(greeting);
}
module.exports = {
    greet
}
```

Node caches the results of the `require` function so that things are not instantiated multiple times, even across different JS files.

Revealing Module Pattern: Exposing only the properties and methods you want via a returned object. A common and clean way to structure and protect code within modules.

#### exports vs. module.exports

The `exports` shorthand cannot be set to something different because then `exports` and `module.exports` will be set to different objects and the `require` function returns `module.exports`.

The `exports` shorthand can, however, be mutated, as it will be changing the object that both `exports` and `module.exports` points to.

The advice is to just use `module.exports`.

#### Requiring Native (Core) Modules

Node has an API that can be accessed or pulled in via `require` for use.

Part of the `require` process is that it checks to see if the required file is the name of a native one, and uses the native file if so.

Read the Node API!

#### Modules and ES6

ECMA2015 added modules to core JS.

The syntax is something like `import * as greetr from 'greet';`

#### Web Server Checklist

The module system created a better way to organize code into reusable pieces.

### Events and the Event Emitter

#### Conceptual Aside: Events

Event: Something that has happened in an application that can be responded to. In Node there are two different kinds of events.

System events come from the C++ core of Node through a library called `libuv`

Custom events are a part of the JS core and deals with events that can be created by a Node developer. These events go through the event emitter.

Often system events will be wrapped into the event emitter, but they are not the same events. There are two events in Node.

There is no concept of events in JS natively.

#### Javascript Aside: Object Properties, First Class Functions, and Arrays

```javascript
// object properties and methods
const obj = {
    greet: 'Hello'
}
console.log(obj.greet);
console.log(obj['greet']);
const prop = 'greet';
console.log(obj[prop]);

// functions and arrays
const arr = [];
arr.push(() => {
    console.log('Hello World 1');
});
arr.push(() => {
    console.log('Hello World 2');
});
arr.push(() => {
    console.log('Hello World 3');
});
arr.forEach(item => item());
```

#### The Node Event Emitter Part 1

Event Listener: The code that responds to an event. In the case of JS, the listener will be a funciton.

```javascript
// emitter.js
function Emitter() {
    this.events = {};
}

// It's common JS practice to call listeners 'on'
// This code puts functions into an array sorted
//  into event type properties.
Emitter.prototype.on = function(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
}

// The event emitter takes an event type
//  and goes thorough the event[type] array
//  executing its functions
Emitter.prototype.emit = function(type) {
    if (this.events[type]) {
        this.events[type].forEach(listener => {
            listener();
        });
    }
}
module.exports = Emitter;

// app.js
const Emitter = require('./emitter');
const emtr = new Emitter();
emtr.on('greet', () => console.log('HELLO 1'))
emtr.on('greet', () => console.log('HELLO 2')); 
emtr.emit('greet');
```

#### The Node Event Emitter Part 2

All the documentation for the Node event emitter lives in the Node API

The Node event emitter is the same concept as the one built in the previous section (Part 1)

```javascript
// Using the internal Node emitter
const Emitter = require('events');
const emtr = new Emitter();

emtr.on('greet', () => console.log('Someone said HELLO'));
emtr.on('greet', () => console.log('A GREETING occurred.'));

console.log('HELLO');
emtr.emit('greet');
```

Magic String: A string that has some special meaning in code. This is bad because it makes it easy for a typo to cause a bug and hard for tools to help us find it.

```javascript
// Refactoring the code to avoid 'magic strings'
// config.js
module.exports = {
    events: {
        GREET: 'greet',
        FILESAVED: 'filesaved',
        FILEOPENED: 'fileopened'
    }
}
// app.js
const Emitter = require('events');
const eventConfig = require('./config').events;
const emtr = new Emitter();

emtr.on(eventConfig.GREET, () => console.log('Someone said HELLO'));
emtr.on(eventConfig.GREET, () => console.log('A GREETING occurred.'));

console.log('HELLO');
emtr.emit(eventConfig.GREET);
```

#### Javascript Aside: Object.create and Prototypes

```javascript
// Using `Object.create` to set an object prototype
//  as in prototypal inheritance
const person = {
    firstname: '',
    lastname: '',
    greet() {
        return this.firstname + ' ' + this.lastname;
    }
}

const john = Object.create(person);
john.firstname = 'John';
john.lastname = 'Doe';

const jane = Object.create(person);
jane.firstname = 'Jane';
jane.lastname = 'Doe';

console.log(john.greet());
console.log(jane.greet());
```

#### Inheriting From the Event Emitter

The Node `inherits` function sets a prototype in between two objects so that one can access the methods of another, which is now part of its prototypal chain.

```javascript
const EventEmitter = require('events');
const util = require('util');

function Greetr() {
    this.greeting = 'HELLO WORLD';
}

// Creates an empty prototype object between Greetr and EventEmitter
//  so that Greetr inherits from EventEmitter
util.inherits(Greetr, EventEmitter);

// Greetr now has access to EventEmitter methods
//  as well as its own.
Greetr.prototype.greet = function(data) {
    console.log(this.greeting + ': ' + data);
    this.emit('greet', data);
}

const greeter1 = new Greetr();

greeter1.on('greet', (data) => console.log('Someone GREETED: ' + data));
greeter1.greet('Robert');
```

Adding `EventEmitter` to an object's prototype chain is a key part of how Node operates.

#### Javascript Aside: Node, ES6, and Template Literals

Template Literal: A way to concatenate strings

The V8 engine in Node can be different from those in browsers and can support (or not) different JS standards and features.

```javascript
let name = 'John Doe';
let greet = 'Hello ' + name;
// Template literal syntax in JS
let greet2 = `Hello ${name} TEMPLATE LITERAL.`;

console.log(name);
console.log(greet);
console.log(greet2);
```

#### Javascript Aside: .call and .apply

```javascript
const obj = {
    name: 'John Doe',
    greet() {
        console.log(`HELLO ${this.name}`);
    }
}
obj.greet();
// Both call and apply are functions that call other
//  functions.
// The call or apply function will change what the `this` variable
//  will be pointing to, chaning it in this case from
//  the 'John Doe' object to the newly-created 'Jane Doe'
//  object.
obj.greet.call({ name: 'Jane Doe' });
// call and apply work exactly the same, except that
//  in the case when there are arguments to be passed
//  to the function. call accepts function arguments as individual
//  arguments separated by commas. apply accepts them as
//  a single array.
obj.greet.apply({ name: 'Todd Doe' });
```

#### Inheriting From the Event Emitter Part 2

```javascript
var EventEmitter = require('events');
var util = require('util');

function Greetr() {
	// Analogous to a super constructor
	// Adds the greeting property to EventEmitter
	EventEmitter.call(this);
	this.greeting = 'HELLO WORLD';
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function() {
	console.log(this.greeting);
	this.emit('greet');
}

var greeter1 = new Greetr();

greeter1.on('greet', function() {
	console.log('Someone GREETED');
});

greeter1.greet();
```

#### Javascript Aside: ES6 Classes

Syntactic Sugar: A feature that only changes how you type something, but nothing changes under the hood. It is still important to know what's going on under the hood, however, so one isn't operating under a flawed conception of how things work.

ES6 classes are syntactic sugar, they do not change anything about how JS prototypal inheritance works.

JS prototypal inheritance is not the same as classes in languages such as Java or C#.

```javascript
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
```

#### Inheriting from the Event Emitter Part 3

```javascript
// Refactoring Greetr code to use classes, template literals,
//  and export.
// greetr.js
'use strict';
const EventEmitter = require('events');
module.exports = class Greetr extends EventEmitter {
	constructor() {
		super();
		this.greeting = 'HELLO WORLD';
	}
	greet(data) {
		console.log(`${this.greeting}: ${data}`);
		this.emit('greet', data);
	}
}
// app.js
'use strict';

var EventEmitter = require('events');
const Greetr = require('./greetr');

var greeter1 = new Greetr();

greeter1.on('greet', function(data) {
	console.log('Someone GREETED: ' + data);
});

greeter1.greet('Robert');
```

### Asynchronous Code, libuv, The Event Loop, Streams, Files, and more...

#### Javascript Aside: Javascript is Synchronous

### HTTP and being a Web Server

### NPM: the Node Package Manager

### Express

### JavaScript, JSON, and Databases

### The MEAN Stack

### Let's Build an App! (In Record Time)