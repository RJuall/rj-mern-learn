# JavaScript, Understanding the Weird Parts

## Anthony Alicea

### 11/21/2018

### Getting Started

#### Introduction

Understand the programming language, don't just copy code

JavaScript has its own mode and design decisions, it's not necessarily like the programming languages it might resemble

It's not enough to know JS frameworks; it's important to know vanilla JS

### Execution Contexts and Lexical Environments

#### Syntax Parsers

"A program that reads your code and determines what it does and if its grammar (syntax) is valid" 

Compilers, Interpreters

Sometimes syntax parsers will translate your intent in a different way than what you expected

#### Execution Contexts

"A wrapper to help manage the code that is running"

It can contain things beyond what is written in the code.

#### Lexical Environments

"Where something sits physically in the code you write"

Syntax parsers care about the placement of your code. Order matters.

#### Name/Value Pairs and Objects

"A name which maps to a unique value"

The name can be defined more than once, but only can have one value in any given context.

The value can be more name/value pairs

Object: A collection of name/value pairs (JavaScript)

It's just that simple.

#### Global Execution Context

Creates a global object and `this` variable by the JS engine

The Global object in browsers is the window object, which is what `this` refers to by default

Global: "Not inside a function"

When variables and functions are created outside of a function, they are attached to the global object (window)

The execution context: Global Object, `this`, the Outer Environment, code that is written

There is no outer environment at the global level

#### The Execution Context: Creation and 'Hoisting'

Variables and functions are 'hoisted' to the top of the javascript file so they can be used throughout the code...?

But that doesn't hold exactly for variables, they are declared, but not assigned...?

Execution context is created in two phases: creation phase and execution phase

During the creation phase memory space is set up for variables and functions (Hoisting)

While the entire function is placed into memory space during creation phase, variables are assigned during execution

In creation phase variables are hoisted and set to `undefined`

Thus, bad to rely on hoisting--write code in the order that you need it

#### Undefined

What does `undefined` mean?

'not defined' and 'undefined' are not equal

`undefined` is a special JS value that means a variable has not been set

can `var x === undefined`

can `var x = undefined`

Never set `var x = undefined` -> will be difficult to debug because not known, then, who set the var to undefined

#### Code Execution

After creation phase, code executed in order its written

#### Single Threaded, Synchronous Execution

Single Threaded: One command at a time (Maybe not that under the hood of the browser)

Synchronous: One at a time, in order

#### Function Invocation and The Execution Stack

Invocation: Running a function/Calling a function. In JS, with `()`

Execution Context placed on top of the execution stack. On top is what's running

Nested functions add to the top of the stack

Once functions complete, they are popped off of the stack

#### Functions, Context, and Variable Environments

Variable Environment: Where variables live and how they relate to each other in memory

Every function has its own variable environment & its own memory space for its variables

Related to the idea of scope

#### The Scope Chain

When looking for a variable in JS a function does not just look in its own variable environment

Each execution also has a reference to its outer environment. That outer environment does not have to be the environment directly below it in the execution stack.

What the outer environment of the function is has to do with its lexical environment--at what level it is defined

A function will follow outer environment references all the way down to the global environment to find a variable--this is the Scope Chain

Can think about when functions are created

#### Scope, ES6, and `let`

Scope: Where a variable is available in code, and if it's truly the _same_ variable or a new copy

`let` is a different way of declaring variables compared to `var`

`let` creates variables in block scope

While the variables declared with `let` are still created in memory the same way as `var`, they cannot be called before they are instantiated--they will not return `undefined` in that instance, it will throw an error

`let` variables are only available in the block they are created, as defined by `{}`

#### Asynchronous Callbacks

Asynchronous: More than one at a time

How does JS handle asynchronous events, being, itself, synchronous

The browser is running all sorts of code simultaneously while running the JS engine

Event Queue

JS looks at the event queue once the execution stack is empty

So, JS just runs through its normal code and looks for events once its done. That's how JS handles asynchronous events.

JS handles those events in the order they happen

### Types and Operators

#### Types and JavaScript

Dynamic Typing: Variables are not specified to be a particular type, their types are figured out during execution

As opposed to static typing, where variable types are specified before execution/compilation

#### Primitive Types

Primitive Type: A type of data that represents a single value (Not an object)

`undefined`: A lack of existence

`null`: Also a lack of existence

Unlike `undefined`, `null` is OK to use by programmers. (Both are able to be used by programmers, but `undefined` is intended to be that the value has not been set by the JS engine)

`boolean`: `true` or `false` 

`number`: Only one numeric type in JS. All numbers are floating-point numbers--this can make math in JS strange

`string`: A sequence of characters, denoted either by single- or double-quotes.

`symbol`: Used in ES6.

http://exploringjs.com/es6/ch_symbols.html

Created by `mySymbol = Symbol('mySymbol')`

Used as unique property keys, never clashes with any other property key (symbol or string).

Can be used as constants representing concepts:

```javascript
const COLOR_RED = Symbol('Red');
const COLOR_GREEN = Symbol('Green');
...

function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        ...
        default:
            throw new Exception('Unknown color: '+color);
    }
}
```

#### Operators

Operator: A special function that is syntactically (written) differently, generally take two parameters and return a specific result

Two parameter operations are written in infix notation

#### Operator Precedence and Associativity

Precedence: Which function gets called first. Functions are called in order of precedence (Higher precedence wins)

Associativity: What order operator functions get called in: L->R or R->L (When functions have the same precedence)

#### Coercion

Coercion: Converting a value from one type to another type

This happens quite often in JS because it is dynamically typed

Unintended coercion can be the cause of many bugs in JS

#### Comparison Operators

`3 < 2 < 1` converts to `true` because the `<` comparison operator has L->R associativity. So, `3 < 2` is `false` and `false < 1` is `true` because `false` converts to `0`

It isn't always obvious what some values will convert to. `undefined` is `NaN` (when attempting to convert to number), but `null` is `0`

The double equals `==` operator will coerce value in attempting to decide if the two values are the same

`null == 0` is `false` for some reason

Coercion behavior seen as a major downside of the JS language

`===` and `!==` are strict equality and strict inequality operators. They do not attempt coercion between the values.

99% of the time use strict equality/inequality operators. Be aware of the implications of the double equals operator

#### Existence and Booleans

Coercion is useful for checking is a variable has been set, etc.

i.e. `if (var) { ... }`

If `0` is a valid value for the variable, then there will be a problem, as `0` is `false`

#### Default Values

JS will not bark at you if function parameters are not provided

`undefined` will be coerced (to a string) to `"undefined"`

The `||` operator returns the value that can be coerced to true, if available

`0 || 1` returns `1`

`1 || 2` returns `1`

`false || "Hello"` returns `"Hello"`

This trick can be used to provide a default value for a function parameter (if value not provided (the left value), the `||` operator will return the right value.

i.e. `paramVal = param || default`

#### Framework Aside: Default Values

Linking different javascript files in a project essentially puts all those files inot one contiguous script file. This is how JS treats those links

This means that there can be collisions between the script files if they use the same variable names, etc.

The `||` operator behavior can be used to avoid collisions in variable names by checking to see if a variable name is already being used.

### Objects and Functions

#### Objects and the Dot

In JS: Objects and functions are very related--perhaps the same subject entirely

Objects in JS: Name/Value pairs

Objects can have primitives (property), objects (property), functions (method)

"Computed Member Access" Operator == `[]`

In an object CMA == `Object["Something"]`

"Member Access" Operator == `.`

#### Objects and Object Literals

In JS there is often more than one way to do something

Object literal: `var obj = new Object();` == `var obj = {}`

The object literal is not a function

JS is very liberal about white space

Object literal notation is the preferred way to create objects in JS

Object literals can be used as parameter arguments in function calls, creating objects on the fly

Object literal syntax is very powerful and can be used to write clean, well-defined code

#### Framework Aside: Faking Namespaces

Namespace: A container for variables and functions, typically to keep variables and functions with the same name separate.

JS does not have namespaces as a language feature, but because of the JS object syntax namespaces are not needed.

#### JSON and Object Literals

JSON = JavaScript Object Notation

JSON is inspired by Object literal notation, but they are not the same thing

XML used to be the default way to pass around information on the web, now JSON

XML wasted too much bandwidth

JSON is just a string of data, looks like JS objects

BUT JSON property names (keys) have to wrapped in quotes

JSON is a _subset_ of the JS object literal syntax

All JSON is valid object literal syntax in JS

JS has built-in utilities to deal with JSON

#### Functions are Objects

The concept of "first class functions" is key to understanding JS

First Class Functions: Everything that can be done with other data types can also be done with functions. i.e. Assign them to variables, pass them around, or create them on the fly.

Functions can have attached primitives, objects, or other functions, since functions are just objects.

Functions have two special object properties: a name and code

A function name is optional, functions can be anonymous

Imperative to keep in mind that JS functions are OBJECTS

#### Function Statements and Function Expressions

Expression: A unit of code that results in a value

Statements just do work, expressions result in a value

Function expressions are not hoisted, as in when functions are assigned to a variable: `var fn = function() {...};`

Functions can be passed to other functions.

Functional programming!

#### Conceptual Aside: By Value vs By Reference

Primitive values are passed by value (a copy is made)

Objects are passed by reference (no copy)

Mutate: To change something

The equals operator sets up new memory space

#### Objects, Functions, and `this`

When a function is run an execution context is created. It has a variable environment where its variables live. It has a reference to its outer lexical environment--where it sits physically in the code, and it creates the `this` variable.

`this` will point to different things based on how the function is called.

When a function is created in the global namespace the `this` variable is set to the global namespace

When a method is invoked the `this` variable refers to the object that contains the method.

A function created within an object will still have `this` refer to the global object.

`var self = this;` can be used to smooth inconsistencies in what `this` can refer to within an object. Essentially by setting `self` to a stable `this` reference (usually a containing object)

The `let` keyword is intended also to smooth these difficulties.

#### Arrays - Collections of Anything

Since JS is dynamically typed, arrays can hold collections of any kinds of data, which also do not have to be consistent within the array.

```javascript
var arr = [
    1,
    false,
    {
        name: 'Rob',
        address: '111 Main St',
    },
    function(name) {
        var greeting  = 'Hello';
        console.log(greeting + name);
    },
    "HELLO"
];
```

#### 'arguments' and Spread

When a function is executed and its execution context is created, the `arguments` keyword is also created

Arguments: The parameters you pass to a function

The `arguments` keyword contains all of the arguments passed into a function

JS does not care if parameters specified in a fn signature are passed into a fn or not. It will still run.

The `arguments` keyword is "array-like" in that it acts like an array, but lacks some of the features of a JS array.

The `spread` operator is an improved method of addressing function parameters in JS.

The `spread` operator is `...`

#### Function Overloading

Function overloading is not available in JS due to functions being objects.

There are various strategies to mimic function overloading in JS

```javascript
function greet(firstname, lastname, language) {
        
    language = language || "en";

    if (language === 'en') {
        console.log('Hello ' + firstname + ' ' + lastname);
    }

    if (language === 'es') {
        console.log('Hola ' + firstname + ' ' + lastname);
    }
}

function greetEnglish(firstname, lastname) {
    greet(firstname, lastname, 'en');
}

function greetSpanish(firstname, lastname) {
    greet(firstname, lastname, 'es');
}

greet('John', 'Doe', 'en');
greet('John', 'Doe', 'es');
greet('John', 'Doe');

greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');
```

#### Syntax Parsers

The syntax parser reads the written code and makes sure it conforms to the specifications of the language.

The JS engine includes a syntax parser.

#### Automatic Semicolon Insertion

The syntax parser in JS attempts to be helpful by automatically inserting semicolons where it expects to see one.

This is why use of semicolons is "optional" in JS

Rule #1: Always use semicolons where you want them to be.

Do not count on the syntax parser to do what you want it to do

#### Whitespace

Whitespace: Invisible characters that create literal 'space' in your written code. i.e. carriage returns, tabs, spaces.

JS is very liberal about accepting whitespace.

```javascript
var 
    // first name of person
    firstname, 
    
    // last name of person
    lastname, 
    
    // the language
    // can be 'en' or 'es'
    language;

var person = {

    // the first name
    firstname: 'John',

    // the last name
    // (always required)
    lastname: 'Doe'
}

console.log(person);
```

#### Immediately Invoked Function Expresssions (IIFE)

Function statements begin with the `function` keyword

Function expressions are set to variables, for example

```javascript
// Using an Immediately Invoked Function Expression (IIFE)
var greeting = function(name) {
    console.log('Hello ' + name);
}('Robbito');

// IIFE as a standalone fn expression
// Parens are necessary to tell the syntax parser
//  that the fn is an expression not a statement
(function(name) {
    console.log('Hello ' + name);
}('Rabbit'));

// The above also works with the invocation
//  outside the wrapping parens
```

#### IIFEs and Safe Code

IIFEs create their own execution contexts, which avoids polluting the global context

In many libraries and functions all the code is wrapped in an IIFE in order to protect the code from interfering or interfering with other code.

The global context can be passed into a function if needed, as so:

```javascript
// IIFE
(function(global, name) {
    var greeting = 'Hello';
    global.greeting = 'Hello';
    console.log(greeting + ' ' + name);
}(window, 'Rob'));
```

#### Understanding Closures

Closures are vital to understanding JS

```javascript
function greet(whatToSay) {
    return function(name) {
        console.log(whatToSay + ' ' + name);
    }
}

greet('Hi')('Rob');

var sayHi = greet('Hi');
sayHi('Robbo');
```

Given the preceding code, how is it that the `sayHi` function still knows about the `whatToSay` variable, since the function that referenced that variable executed in creating the `sayHi` variable function?

The answer is closures

Though the `greet` function's execution context is popped off of the stack after it executes, the memory allocated for its variables, etc. still exists & the `sayHi` variable function references those values. 

The JS engine ensures that the referenced memory stays available

This concept of enclosing all the memory that an execution context requires, making sure that proper scope is kept intact, is known as a closure

Closure is a language feature

#### Understanding Closures Part 2

```javascript
function buildFunctions() {
    var arr = [];
    for (var i = 0; i < 3; i++) {
        arr.push(
            function() {
                console.log(i);
            }
        )
    }
    return arr;
}

var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();
```

Given the code above, the `fs` array functions will always return `3` because the functions are invoked at the bottom of the code, when `i === 3`, which was the exit condition for the loop. Closure keeps the `i` variable in memory so that the `fs` functions can access the `i` variable, but its value was set in the loop which created the function code in memory--where the functions are NOT invoked.

Variables that are outside a function that the function still has access to are also known as free variables.

```javascript
// The ES6 method of achieving `0 1 2` with the previous code
function buildFunctions2() {
    var arr = [];
    for (var i = 0; i < 3; i++) {
        let j = i;
        arr.push(
            function() {
                console.log(j);
            }
        )
    }
    return arr;
}

var fs2 = buildFunctions2();

fs2[0]();
fs2[1]();
fs2[2]();
```

```javascript
// The ES5 method of achieving `0 1 2` with the original code
function buildFunctions3() {
    var arr = [];
    for (var i = 0; i < 3; i++) {
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);
                }
            }(i))
        )
    }
    return arr;
}

var fs3 = buildFunctions3();

fs3[0]();
fs3[1]();
fs3[2]();
```

#### Function Factories

JS closures allow for 'function factories' such as the following:

```javascript
function makeGreeting(language) {
    return function(firstname, lastname) {
        if (language === "en") {
            console.log("Hello " + firstname + ' ' + lastname);
        }
        if (language === "es") {
            console.log("Hola " + firstname + ' ' + lastname);
        }
    }
}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('Rob', 'Juall');
greetSpanish('Rob', 'Juall');
```

Each time `makeGreeting()` is called it creates a new execution context which can then lead to encapsulation by variables, etc. of different variable values, `'en'` or `'es'` in this case.

#### Closures and Callbacks

`setTimeout()` is a good example of using closures and function expressions. In the following code `setTimeout` takes a function expression as its first parameter and that function logs a variable external to itself. JS closures are what preserves that scope chain, allowing the function expression to reference that variable external to its local scope, even though the variable's own local scope had long since ceased to exist. Without closures, `setTimeout` would not function as it does.

```javascript
function sayHiLater() {
    var greeting = 'Hi.';

    setTimeout(function() {
        console.log(greeting);
    }, 3000);
}

sayHiLater();
```

Callback Function: A function you give to another function, to be run when the other function is finished. (So the function you call (i.e. invoke), 'calls back' by calling the function you gave it when it finishes.)

```javascript
// Example of a callback function
function tellMeWhenDone(callback) {
    var a = 1000; // some work
    var b = 2000; // some other work

    callback(); // the 'callback', it runs the function I give it
}

tellMeWhenDone(function() {
    console.log('I am done.');
});
```

#### Call(), Apply(), and Bind()

`call()`, `apply()`, and `bind()` are related to the `this` variable

In addition to the special properties of having a name and invocable code, functions have access to the special `call()`, `apply()`, and `bind()` methods.

`bind()` can be used to specify an execution context for the `this` variable by creating a copy of the object with a new `this` variable value.

```javascript
// The functions below use the bind method
//    to specify that this refers to the person
//    object and not the global object
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
```

A function can be invoked using the `call()` method, opposed to simply using parens. The first argument of the `call()` method specifies the execution context for the `this` variable, the remaining arguments are passed to the function normally.

The `call()` method: `logName.call(person, 'en', 'es');`

The `apply()` method acts almost identically to the `call()` method, except that it expects the function arguments in the form of an array. It is otherwise identical to `call()`

The `apply()` method: `logName.apply(person, ['en', 'es']);`

Arrays can be more useful, especially in the case of mathematics, numbers, and a variable number of arguments.

```javascript
// Function borrowing
// Using the person object above
var person2 = {
    firstname: 'Jane',
    lastname: 'Doe'
};

console.log(person.getFullName.apply(person2));
```

```javascript
// Function currying
// Uses bind to create a copy of the
//   multiply function where the a argument
//   is permanently set to 2
// This technique does not change the this variable context
function multiply(a, b) {
    return a * b;
}

var multipleByTwo = multiply.bind(this, 2);
console.log('Mult by 2: ' + multipleByTwo(10));
```

Function Currying: Creating a copy of a function, but with some preset parameters. Very useful in mathematical situations.

#### Functional Programming

JS has much in common with functional programming languages such as Lisp, Schema, Haskell, etc.

Functions should not mutate data in a functional programming paradigm, instead return something new.

Using functional programming paradigms is a good way of unlocking JS's power in relation to other programming languages.

```javascript
var arr1 = [1,2,3];
console.log(arr1);

var arr2 = [];
for (var i = 0; i < arr1.length; i++) {
    arr2.push(arr1[i] * 2);
}
console.log(arr2);

// Functional programming uses first-order functions
//   to accomplish work, by passing functions into
//   other functions, for example.
function mapForEach(arr, fn) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push(
            fn(arr[i])
        );
    };
    return newArr;
}

var arr3 = mapForEach(arr1, function(item) {
    return item * 2;
});

// The mapForEach fn can do all sorts of different
//   kinds of work on an array, as the work fn
//   is provided as an argument. This makes it
//   very flexible.
var arr4 = mapForEach(arr1, function(item) {
    return item > 2;
});

console.log(arr1);
console.log(arr3);
console.log(arr4);

var checkPastLimit = function(limiter, item) {
    return item > limiter;
}

// By using the ability of bind to set argument values,
//   a fn with more than one required arg can be passed
//   and used effectively in the mapForEach fn.
var arr5 = mapForEach(arr1, checkPastLimit.bind(this, 1));
console.log(arr5);

// By refactoring checkPastLimit to return a fn,
//   the fn can be made simpler and will not require that
//   bind() be called frequently throughout the code.
var checkPastLimit2 = function(limiter) {
    return function(limiter, item) {
        return item > limiter;
    }.bind(this, limiter);
};

var arr6 = mapForEach(arr1, checkPastLimit2(1));
console.log(arr6);
```

#### Functional Programming Part 2

The Underscore.js annotated code can be used to learn some of these advanced JS concepts.

Underscore is wrapped as an IIFE

How can functional programming be used to create better, easier to understand, easily extensible code?

#### Classical v. Prototypal Inheritance

Inheritance: One object gets access to the properties and methods of another object.

Classical Inheritance: As in Java/C#. The way inheritance has been done historically. Not the only method and not without its downsides. Verbose. Can be complicated.

Prototypal Inheritance: Simple, flexible, extensible, easy to understand. Used by JS.

#### Understanding the Prototype

All JS objects have a prototype property that is its prototype.

Prototypes can also have their own prototypes.

Prototypes create a prototype chain, which can be seen as analogous to the scope chain.

Objects can share the same prototypes. All objects can have the same prototype, even.

```javascript
// Examples of how prototypal
//   inheritance works in JS
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
console.log(john.getFullname()); // John Doe

var jane = {
    firstname: 'Jane'
}
jane.__proto__ = person;
console.log(jane.getFullname()); // Jane Default
```

#### Everything is an Object (Or a Primitive)

EVERYTHING in JS that is not a primitive is an object

The object prototype is the base prototype that everthing ultimately inherits from (except primitives).

Object prototype itself has no prototype. It is the base.

For example, the prototype of an array object is the array prototype, which has methods that every specific array has access to. The prototype of the array prototype is the object prototype, which also has methods that all objects (and, thus, arrays) have access to. The prototype of the object prototype is null.

#### Reflection and Extend

Reflection: An object can look at itself, listing and changing its properties and methods.

```javascript
  // The underscore extend function that mimics inheritance
  _.extend = createAssigner(_.allKeys);

  // The guts of the underscore extend function
  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };
```

ES6 has an `extends` keyword that sets the prototype

#### Function Constructors, 'new', and the History of JS

The `new` keyword is an artifact of the effort to attract Java developers to JavaScript.

The `new` keyword is an operator that creates an empty object and then invokes the function following the `new` operator

Function Constructors: A normal function that is used to construct objects. The `this` variable pointss to a new empty object and that object is returned from the function automatically.

```javascript
// Playing with function constructors
function Person(firstname, lastname) {
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked');
}

var john = new Person('John', 'Doe');
console.log(john);
var jane = new Person('Jane', 'Doe');
console.log(jane);
```

#### Function Constructors and `.prototype`

All functions have a prototype property that is only used when the `new` operator is used, as in the function constructor.

The prototype property of the function is not the prototype of the function, it is the prototype of any objects created if the  function is used as a function constructor.

Adding methods to an object's prototype is efficient for memory usage because that method then only exists once in memory, as opposed to as many times as the object exists.

The `Object.prototype` method adds something to the prototype of the object invoking the method.

```javascript
function Person(firstname, lastname) {
 
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.');
    
}

Person.prototype.getFullName = function() {
    return this.firstname + ' ' + this.lastname;
}

var john = new Person('John', 'Doe');
console.log(john);

var jane = new Person('Jane', 'Doe');
console.log(jane);

Person.prototype.getFormalFullName = function() {
    return this.lastname + ', ' + this. firstname;
}

console.log(john.getFormalFullName());
```

#### 'new' and Functions

Omitting the `new` operator when attempting to use the function constructor will result in unintended behavior, i.e. setting the variable to `undefined`

Using the convention of capitalizing functions intended to be executed via the function constructor can help avoid errors.

#### Built-In Function Constuctors

JS has some function constructors built-in, such as ones that create objects that model primitive types.

Examples include: `var a = new Number(4);` or `var b = new String('Hello');`

Function constructors return objects, so these variables will be holding objects and not primitives.

Because they are objects, they have prototypes and have methods, such as `String.length()`

As an aside, when calling string methods on a string itself the JS engine 'boxes' the primitive value into a string object which has those methods, as primitive values do not have methods.

One can add methods to the built-in function constructors as well, adding functionality to `String` or `Number`, for example.

```javascript
String.prototype.isLengthGreaterThan = function(limit) {
    return this.length > limit;
}

console.log("John".isLengthGreaterThan(3));

Number.prototype.isPositive = function() {
    return this > 0;
}
```

#### Dangerous: Built-In Function Constructors

Given `var a = 3;` and `var b = Number(3);`, while `a == b` will evaluate to `true`, `a === b` will not. It is better to use literals than function constructors.

Because of this, it is dangerous to use function constructors for primitive types(ish), and it is thus dangerous to use the technique of adding functionality to the primitive object prototypes. Using these features may cause trouble down the line.

#### Dangerous: Arrays and for...in

In JS arrays the index number is the property name of the value contained at the index.

The `for...in` structure will work with JS arrays because the index is a property name.

But if the array prototype is changed to add functionality, those changes will appear in a `for...in` loop. Libraries can change prototypes without one knowing about it.

Better to use the standard `for` loop with arrays.

#### Object.create and Pure Prototypal Inheritance

The `Object.create()` method creates an object with the prototype being an object passed into the method.

This is an example of pure prototypal inheritance. Objects are created using other objects as their prototypes and the details can be overridden after creation.

The prototypal object can be changed later.

Polyfill: Code that adds a feature which the engine may lack

```javascript
// Polyfill
if (!Object.create) {
    Object.create = function(o) {
        if (arguments.length > 1) {
            throw new Error('Object.create implementation'
            + ' only accepts the first parameter.');
        }
        function F() {}
        F.prototype = o;
        return new F();
    };
}

var person = {
    firstname: 'Default',
    lastname: 'Default',
    greet: function() {
        return 'Hi ' + this.firstname;
    }
}

var john = Object.create(person);
john.firstname = 'John';
john.lastname = 'Doe';
console.log(john);
```

#### ES6 and Classes

A JS class defines an object.

ES6 classes are not identical to classes in other programming languages.

In JS classes are objects.

The `extends` keywords sets the prototype.

The `super` keyword accesses the prototype's properties and methods.

The JS class syntax still uses the JS prototypal inheritance system.

Syntactic Sugar: A different way to type something that doesn't change how it works under the hood.

#### Initialization

```javascript
var people = [
    {
        // The 'john' object
        firstname: 'John',
        lastname: 'Doe',
        addresses: [
            '111 Main St.',
            '222 Third St.'
        ]
    },
    {
        // The 'jane' object
        firstname: 'Jane',
        lastname: 'Doe',
        addresses: [
            '333 Main St.',
            '444 Fifth St.'
        ],
        greet: function() {
            return 'Hello!';
        }
    }
]
```

Though the syntax might not be pretty, large initializations such as the above are useful and not to be feared.

#### Figuring Out What Something Is

```javascript
// The `typeof` function returns a string that represents the type of the variable, primitive, etc. that is passed to it
var a = 3;
console.log(typeof a); // "number"
```

The type of according to the `typeof` method is "object". Using `Object.prototype.toString.call(arr)` will work properly for arrays.

The `instanceof` function examines the prototypal chain of an object to check if its argument is found. It checks to see if an object is an instance of a passed-in object.

The `typeof` function will work as expected for functions as well, returning "function".

#### Strict Mode

The `"use strict";` flag tells the JS engine to be less lax with the rules of JS.
 
The `"use strict";` flag must be used at the top of a JS file or at the top of a function, which would then be the only thing subject to the stricter rules.

One thing that is then enforces is that a variable must be explicitly declared before it can be set.

Not every JS engine implements `"use strict";` in the same way, thus it is not 100% reliable.

Concatenating and minifying a number of JS files can be affected by the use of `"use strict";` in the first file.

#### Learning from Other's Good Code

Part of the purpose of this course is to give the student the ability to read complicated JS code and understand it.

This can be used to further one's JS/CS/programming education.

Making a habit of taking a look at source code is very helpful.

#### Deep Dive: jQuery part 1

Code examined: jQuery 1.11.2

jQuery is intended to smooth over the differences between browsers and manipulate the DOM.

jQuery method exist on the jQuery object prototype to save memory.

jQuery is wrapped as an IIFE.

The jQuery function, `$` or `jQuery`, is not a function constructor. It's just a function. This is why the `new` operator is not needed when invoking jQuery. It _is_ a function that returns a function constructor, however.

#### Deep Dive: jQuery part 2

jQuery includes an entirely seperate library, 'Sizzle', as its own IIFE inside of jQuery.

The jQuery `jQuery.fn.init` function returns an altered empty object that the `new` operator creates.

The jQuery library uses prototypical inheritance liberally to hide the use of the `new` operator and to make sure that methods are available where they need to be.

#### Deep Dive: jQuery part 3

jQuery-style chaining allows for methods to be chained that do nwork on the original invoking object in sequence.

Method Chaining: Calling one method after another, and each method affects the parent object. So `obj.method1().method2()` where both methods end up eith a `this` variable pointing at 'obj'

The jQuery `addClass` and `removeClass` are extended onto the prototype and return `this`, which returns the invoking object so that further methods can be called. This allows chaining to work.

`window.jQuery = window.$ = jQuery`

#### TypeScript, ES6, and Transpiled Languages

