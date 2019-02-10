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

Asynchronous: More than one process running simultaneously. Node does things asynchronously, V8 does not.

Synchronous: Once process executing at a time. JS is synchronous.

#### Conceptual Aside: Callbacks

Callbacks: A function passed to some other function, which we assume will be invoked at some point. The function 'calls back' invoking the function you give it when it is done doing its work.

#### libuv, The Event Loop, and Non-Blocking Asynchronous Code

Non-Blocking: Doing other things without stopping your program from running. This is made possible by Node's asynchronous nature.

`libuv` is the C++ module that allows for asynchonous code in V8. It runs an event loop that constantly scans for events occurring, letting JS know when events have completed.

`libuv` is a multi-platform support library for asynchronous I/O

#### Conceptual Aside: Streams and Buffers

Buffer: A temporary holding spot for data being moved from one place to another. Intentionally limited in size.

Stream: A sequence of data made available over time. Pieces of data that eventually combine into a whole.

#### Conceptual Aside: Binary Data, Character Sets, and Encoding

Binary Data: Data stored in binary (0's and 1's). The core of the math that computers are based on. Each one or zero is called a 'bit' or 'binary digit'.

Everything that's stored in a computer must be represented as a binary number.

Character Set: A representation of characters as numbers. Each character gets a number. Unicode and ASCII are character sets.

Character Encoding: How characters are stored in binary. The numbers (or code points) are converted and stored in binary.

UTF-8 is the most popular character encoding on the internet.

JS is not very good with binary encoding, Node js goes a long way towards adding that functionality to JS.

#### Buffers

The `buffer` object is written in the C++ side of Node and made available in JS.

The `buffer` object contains a lot of methods for handling binary data.

The buffer holds raw binary data.

Relatively rare that the buffer is accessed directly.

```javascript
const buf = new Buffer('Hello', 'utf8');
console.log(buf);
console.log(buf.toString());
console.log(buf.toJSON());
console.log(buf[2]);

buf.write('wo');
console.log(buf.toString());
/*
<Buffer 48 65 6c 6c 6f>
Hello
{ type: 'Buffer', data: [ 72, 101, 108, 108, 111 ] }
108
wollo
*/
```

#### Javascript Aside: ES6 Typed Arrays

Byte: 8 bits.

ES6 Javascript got a new feature `ArrayBuffer` that can be used to interface with binary data.

```javascript
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
view[0] = 5;
view[1] = 15;
console.log(view);
```

#### Javascript Aside: Callbacks

```javascript
function greet(callback) {
    console.log('HELLO WORLD');
    callback();
}
greet(() => console.log('CALLBACK HAPPENED'));
greet(() => console.log('DIFFERENT CALLBACK'));
```

#### Files and fs

Error-First Callback: Callbacks take an error object as their first parameter. `null` if no error, otherwise will contain an object defining the error. This is a standard so we know in what order to place our parameters for our callbacks.

Try to use asynchronous code when possible. It will make code more performant.

```javascript
const fs = require('fs');
// readFileSync is synchronous, blocking
const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);
// readFile is asynchronous and accepts a callback
const greet2 = fs.readFile(__dirname + '/greet.txt', (err, data) => {
    console.log(data);
    // <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21>
});
const greet3 = fs.readFile(__dirname + '/greet.txt', 'utf8', (err, data) => {
    console.log(data);
    // Hello world!
});
console.log('DONE'); // logs before async callbacks
```

#### Streams

Chunk: A piece of data being sent through a stream. Data is split in 'chunks' and streamed.

Streams are EventEmitters (they inherit from EventEmitter).

Streams are an abstract class.

Abstract (Base) Class: A type of constructor you never work directly with, but inherit from. We create new custom objects which inherit from the abstract base class.

The prototype chain for streams is something like: EventEmitter->Stream->StreamType->CustomStream

```javascript
var fs = require('fs');

var readable = fs.createReadStream(__dirname + '/greet.txt', { encoding: 'utf8', highWaterMark: 16 * 1024 });
var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

readable.on('data', function(chunk) {
	console.log(chunk.length);
	writable.write(chunk);
});
```

#### Conceptual Aside: Pipes

Pipe: Connecting two streams by writing to one stream what is being read from another. In Node you pipe from a Readable stream to a Writeable stream.

#### Pipes

Method Chaining: A method returns an object so we can keep calling more methods. Sometimes it returns the parent object (called 'cascading') and sometimes some other object.

```javascript
var fs = require('fs');
var zlib = require('zlib');

var readable = fs.createReadStream(__dirname + '/greet.txt');

var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

var compressed = fs.createWriteStream(__dirname + '/greet.txt.gz');

var gzip = zlib.createGzip();

readable.pipe(writable);
readable.pipe(gzip).pipe(compressed);
```

#### Web Server Checklist

JS can now deal with files via streams.

JS can now deal with work that takes a long time due to asynchronous code, which will allow the program to continue even as tasks that take a while execute.

### HTTP and being a Web Server

#### Conceptual Aside: TCP/IP

Protocol: A set of rules two side agree on to use when communicating. Both the client and server are programmed to understand and use that particular set of rules. It's similar to two people from different countries agreeing on a language to speak in.

The client/server model needs a communication protocol so that the two sides of the equation can speak to each other. That protocol is TCP/IP.

HTTP, FTP, SMTP are themselves protocols

TCP === 'Transmission Control Protocol'

IP === 'Internet Protocol'

TCP is the protocol for sending information down a network in packets.

IP is the protocol for addressing nodes of a network.

The concept of websockets is to have sockets between nodes that do not close so that data can be transferred continually, unlike a normal socket.

TCP operates as a stream and is seen as such by Node.

#### Conceptual Aside: Addresses and Ports

Port: Once a computer receives a packet, how it knows what program to send it to. When a program is setup on the operating system to receive packets from a particular port, it is said that the program is 'listening' to that port.

Node is assigned a port number so that when a request is made to a web server the server will know that Node is the intended target.

#### Conceptual Aside: HTTP

HTTP: HyperText Transfer Protocol. A set of rules (and a format) for data being transferred on the web. It's a format of various defining data being transferred via TCP/IP.

```
// REQUEST
CONNECT www.google.com:443 HTTP/1.1
Host: www.google.com
Connection: keep-alive
// RESPONSE
HTTP/1.1 200 OK
Content-Length: 44
Content-Type: text/html
```

MIME Type: A standard for specifying the type of data being sent. Stands for 'Multipurpose Internet Mail Extensions'. i.e. application/json, text/html, image/jpeg.

#### http_parser

The `http-parser` code is an independent block of C code that is embedded in Node.

This code is then bound to the Node HTTP server.

The `createServer` method takes a listener which tells the server what to do once a HTTP request is detected.

#### Let's Build a Web Server in Node

```javascript
const http = require('http');

http.createServer(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('HELLO WORLD\n');

}).listen(1337, '127.0.0.1');
```

#### Outputting HTML and Templates

Template: Text designed to be the basis for final text or content after being processed. There's usually some specific template language, so the template system knows how to replace the placeholders with values.

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    var message = "TEMPLATE WORLD";
    html = html.replace('{Message}', message);
    res.end(html);
    
}).listen(1337, '127.0.0.1');
```

#### Streams and Performance

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // This pipes the input stream directly to the response
    //  object, ultimately rendering the web page in chunks
    //  so as to allow for many requests on the same assets
    //  and improving performance.
    fs.createReadStream(__dirname + '/index.htm').pipe(res);
    
}).listen(1337, '127.0.0.1');
```

Use streams wherever possible and if not using streams, know why not to.

#### Conceptual Aside: APIs and Endpoints

API: Application Programming Interface. A set of tools for building a software application. On the web the tools are usually made available via a set of URLs which accept and send only data via HTTP and TCP/IP.

Endpoint: One URL in a web API. Sometimes that endpoint (URL) does multiple things by making choices based on the HTTP request headers.

#### Outputting JSON

Serialize: Translating an object into a format that can be stored or transferred. JSON, CSV, XML, and others are popular. 'Deserialize' is the opposite (converting the format back into an object).

```javascript
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-Type': 'application/json'});
    const obj = {
        firstname: 'John',
        lastname: 'Doe'
    };
    res.end(JSON.stringify(obj));
}).listen(1337, '127.0.0.1');
```

#### Routing

Routing: Mapping HTTP requests to cntent. Whether actual files exist on the server or not.

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {

  if (req.url === '/') {
    fs.createReadStream(__dirname + '/index.htm').pipe(res);
  }

  else if (req.url === '/api') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var obj = {
      firstname: 'John',
      lastname: 'Doe'
    };
    res.end(JSON.stringify(obj));
  } 

  else {
    res.writeHead(404);
    res.end();
  }

}).listen(1337, '127.0.0.1');
```

#### Web Server Checklist

JS now has the ability to communicate over the internet.

JS also has the ability to accept requests and send responses (in the standard format).

### NPM: the Node Package Manager

#### Conceptual Aside: Packages and Package Managers

NPM: Node Package Manager

Package: In software, a package is code. Managed and maintained with a package management system.

Package Management System: Software that automates installing and updating packages. Deals with what version you have or need, and manages dependencies.

Dependency: Code that another set of code depends on to function. If you use that code in your app, it is a dependency. Your app depends on it.

#### Conceptual Aside: Semantic Versioning (semver)

Versioning: Specifying what versio of a set of code this is so others can track if a new version has come out. This allows to watch for new features, or to watch for 'breaking changes'.

The word 'semantic' implies that something conveys meaning.

For example: Major.Minor.Patch format => `1.7.3`

Patch versions fix errors in the code, minor versions add new features but will not disrupt compatability, major versions imply big changes that may affect code bases.

semver.org

#### NPM and the NPM Registry: Other People's Code

There's a lot of good information about each NPM package on the NPM website that can help users understand each package and how to use it.

#### init, nodemon, and package.json Part 1

Before installing NPM packages to a project, it must be set up so that the packages are tracked properly in the project.

Every Node program has an entry point. The entry point for this course has been `app.js`

`npm i moment --save` installs and saves the application dependency to the package.json file

In the package.json, a NPM package followed by a version number preceded by a carat, i.e. `^2.3.4` indicates that the package can be subsequently updated to any minor version. If it's preceded by a tilde, i.e. `~2.3.4`, that indicates that only a patch change is acceptable.

The Node `require` function will look for package names where it expects to find the `node_module` folder so that the specific directory information does not have to be written out in a Node application, i.e. `const a = require('thisPackage');` instead of `const a = require('./node_modules/thisPackage')'`

#### init, nodemon, and package.json Part 2

The `npm install thisPackage --save-dev` command will track a package as a dependency for application development only, which is useful for tools such as testing tools.

The `-g` flag on the `npm` command installs a package globally, as in not specific to a project.

`npm update` will check to see if there are updates to any of the project dependencies and download the updates if found.

The `nodemon` package is a wrapper for Node, executes scripts as Node does, but then waits for the script to change and re-running it if changes are detected.

#### Using Other People's Code

The packages on NPM are just other people's code. Be careful what you use and YMMV.

### Express

#### Installing Express and Making it Easier to Build a Web Server

Express encapsulates a lot of Node code, making applications easier to write. Much (or all) of what express does can be written in Node without the express package.

Environment Variables: Global variables specific to the environment (server) our code is living in. Different servers can have different variable settings and we can access those values in code.

HTTP Method: Specifies the type of action the request wishes to make. GET, POST, DELETE, and others. Also called verbs.

```javascript
const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/person/:id', function(req, res) {
    res.send('<html><head></head><body><h1>HELLO WORLD</h1></body></html');
});

app.get('/api', function(req, res) {
    res.json({ firstname: 'John', lastname: 'Doe' });
});

app.listen(port);
```

#### Routing

```javascript
const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', function(req, res) {
    res.send('<html><head></head><body><h1>HELLO WORLD</h1></body></html');
});

// ':id' indicates a variable to Express
app.get('/person/:id', function(req, res) {
    res.send('<html><head></head><body><h1>PERSON: ' + req.params.id + '</h1></body></html');
});

app.get('/api', function(req, res) {
    res.json({ firstname: 'John', lastname: 'Doe' });
});

app.listen(port);
```

#### Static Files and Middleware

Middleware: Code that sits between two layers of software. In the case of Express, sitting between the request and the response.

Static: Not dynamic. Files that are not processed by code in any way. i.e. HTML, CSS, and image files are static files.

```javascript
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

// Express handling middleware
app.use('/assets', express.static(__dirname + '/public'));
app.use('/', function(req, res, next) {
	console.log('Request URL: ' + req.url);
	next();
});

app.get('/', function(req, res) {
	res.send('<html><head><link href=/assets/style.css type=text/css rel=stylesheet /></head><body><h1>Hello world!</h1></body></html>');
});

app.get('/person/:id', function(req, res) {
	res.send('<html><head></head><body><h1>Person: ' + req.param.id + '</h1></body></html>');
});

app.get('/api', function(req, res) {
	res.json({ firstname: 'John', lastname: 'Doe' });
});

app.listen(port);
```

#### Templates and Template Engines

Express is an "unopinionated" web framework.

```javascript
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/person/:id', function(req, res) {
	res.render('person', { ID: req.params.id });
});

app.get('/api', function(req, res) {
	res.json({ firstname: 'John', lastname: 'Doe' });
});

app.listen(port);
```

#### Querystring and POST parameters

```javascript
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
});

app.get('/', function(req, res) {
	res.render('index');
});

// Parsing out a query string from a GET request
//  http://localhost:3000/person/4?qstr=hello
app.get('/person/:id', function(req, res) {
	res.render('person', { ID: req.params.id, Qstr: req.query.qstr });
});

// Using the body-parser middleware to parse
//  fields from a post request
app.post('/person/', urlencodedParser, function(req, res) {
	res.send('Thank you!');
	console.log(req.body.firstname);
	console.log(req.body.lastname);
});

// Using the body-parser middleware to parse
//  fields from a json object
app.post('/personjson', jsonParser, function(req, res) {
	res.send('Thank you for the JSON data!');
	console.log(req.body.firstname);
	console.log(req.body.lastname);
})

app.get('/api', function(req, res) {
	res.json({ firstname: 'John', lastname: 'Doe' });
});

app.listen(port);
```

#### RESTful APIs and JSON

REST: An architectural style for building APIs. Stands for 'Representational State Transfer'. We decide that HTTP verbs and URLs mean something.

```javascript
// The API calls describe clearly what is happening
//  using HTTP methods and URLs
app.get('/api/person/:id', function(req, res) {
    // Get that data from the database
    ...
});
app.post('/api/person', jsonParser, function(req, res) {
    // Save to the database
    ...
});
app.delete('/api/person/:id', function(req, res) {
    // Delete from the database
});
```

#### Structuring an App

Breaking up an application's code becomes essential for larger web application projects.

One app structure involves a `bin` folder for server setup, `public` for static public-facing files, `routes` for express routing, `views` for different pages, and an `app.js` entry point.

A `controller` folder can separate code that lives between the app and its data.

### JavaScript, JSON, and Databases

#### Conceptual Aside: Relational Databases and SQL

Tabular data in JS can be thought of as JS objects (key/val pairs)

#### Node and MySQL

```javascript
var express = require('express');
var app = express();
const mysql = require('mysql');

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);

	const con = mysql.createConnection({
		host: "localhost",
		user: "test",
		password: "test",
		database: "addressbook"
	});

	con.query('SELECT People.ID, Firstname, Lastname, Address' +
		'FROM People INNER JOIN PersonAddresses ON' +
		'People.ID = PersonAddresses.PersonID INNER JOIN' +
		'Addresses ON Person Addresses.AddressID = Addresses.ID',
		function(err, rows) {
			if(err) throw err;
			console.log(rows);
		}
	);

	next();
});

htmlController(app);

apiController(app);

app.listen(port);
```

What's coming back from databases in a Node application is going to be an array of JS objects (most of the time?)

#### Conceptual Aside: NoSQL and Documents

NoSQL: A variety of technologies that are alternatives to tables and SQL. One of those types is a document database. MongoDB is one of those.

Data is stored with its structure and its data simultaneously. Thus, the 'schema' is flexible.

#### MongoDB and Mongoose

```javascript
var express = require('express');
var app = express();
const mongoose = require('mongoose');

mongoose.connect('LOREM');

const Schema = mongoose.Schema;

const personSchema = new Schema({
	firstname: String,
	lastname: String,
	address: String
});

// Essentially a function constructor
const Person = mongoose.model('Person', personSchema);

// Instantiating the Mongoose object
const john = Person({
	firstname: "John",
	lastname: "Doe",
	address: "555 Main St."
});

// Save 'john' to the database
john.save(function(err) {
	if (err) throw err;
	console.log("Person Saved!");
});

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	// Get all the users
	Person.find({}, function(err, users) {
		if (err) throw err;
		// Object of all the users
		console.log(users);
	})

	next();
});

htmlController(app);

apiController(app);

app.listen(port);
```

#### Web Server Checklist

With the ability to deal with databases, now we see that Node is a complete and robust web server technology.

### The MEAN Stack

#### MongoDB, Express, AngularJS, and NodeJS

Stack: The combination of all technologies used to build a piece of software. Your database system, your server side code, your client side code, and everything else.

MEAN stack: MongoDB, Express, Angular, Node

AngularJS: JS framework for managing code and UI in the browser.

MEAN stack is full-stack JS (ish).



### Let's Build an App! (In Record Time)