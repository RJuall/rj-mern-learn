# JavaScript, Understanding the Weird Parts

## Anthony Alicea

### 11/21/2018

#### Introduction

Understand the programming language, don't just copy code

JavaScript has its own mode and design decisions, it's not necessarily like the programming languages it might resemble

It's not enough to know JS frameworks; it's important to know vanilla JS

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

#### Types and JavaScript

Dynamic Typing: Variables are not specified to be a particular type, their types are figured out during execution

As opposed to static typing, where variable types are specified before execution/compilation

