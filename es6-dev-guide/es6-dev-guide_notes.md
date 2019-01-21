# ES6 Javascript: The Complete Developer's Guide

## Stephen Grider

### 1/20/19

### Before We Get Started

#### How to Take This Course

<a href="https://stephengrider.github.io/JSPlaygrounds/">JS Playgrounds</a>

#### ES6 vs ES5

ES6 = ECMAScript v6

ECMAScript is the standard (a description of a scripting language) and Javascript is the implementation.

ES6 is a new version of Javascript

ES6 = ES2015

Rapid versioning locks developers into using transpilers such as Babel.

### The 'forEach' Helper

#### Array Helper Methods

Array helper methods include: `forEach`, `map`, `filter`, `find`, `every`, `some`, `reduce`

The array helper methods tend to work in the exact same way so knowledge of one means knowledge in the others.

Mastery of these methods is incredibly helpful for web dev

They mostly replace `for` loops

#### the forEach Helper

Arrays in JS have access to the `forEach` method which will iterate through the array. The `forEach` method will accept a function that will be executed once for every element in the array. This function is known as the iterator function.

The `forEach` is significantly less logic than a `for` loop

#### forEach Continued

The `forEach` method will accept an anonymous function, though it does not have to be such.

```javascript

var nums = [1,2,3,4,5];
var sum = 0;

// This
function adder(number) {
  sum += number;
}

nums.forEach(adder);

// Or this
nums.forEach(function(number) {
    sum += number;
});
```

#### Why Use forEach?

The `forEach` helper is the "swiss army knife" of array helpers. Each other array helper could be reimplemented using `forEach`

### The 'map' Helper

#### The Map Helper

```javascript
var nums = [1,2,3,4,5];

var doubleNums = nums.map(function(num) {
	return num * 2;
});
```

#### Map Helper Continued

```javascript
var cars = [
  { model: 'Buick', price: 'CHEAP' },
  { model: 'Camaro', price: 'expensive!' }
];

var prices = cars.map(function(car) {
  return car.price;
});
```

#### Where Map is Used

Much of web dev is rendering lists of data...

### The 'filter' Helper

### The 'find' Helper

### The 'every' and 'some' Helper

### The 'reduce' Helper

### Const/Let

### Template Strings

### Arrow Functions

### Enhanced Object Literals

### Default Function Arguments

### Rest and Spread Operator

### Destructuring

### Classes

### Generators

### Promises and Fetch