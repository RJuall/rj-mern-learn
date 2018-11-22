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

