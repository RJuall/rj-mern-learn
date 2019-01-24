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

### Modules, Exports, and Require

### Events and the Event Emitter

### Asynchronous Code, libuv, The Event Loop, Streams, Files, and more...

### HTTP and being a Web Server

### NPM: the Node Package Manager

### Express

### JavaScript, JSON, and Databases

### The MEAN Stack

### Let's Build an App! (In Record Time)