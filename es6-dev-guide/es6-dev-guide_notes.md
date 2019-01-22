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

#### Selected Needed Data with Filter

Creates a subset of an array and avoids mutating the original array.

The iterator function must return a true or false value which decides whether an array item is added to the subset.

#### More on Filtering

```javascript
var products = [
  { name: 'cucumber', type: 'vegetable', quantity: 0, price: 1 },
  { name: 'orange', type: 'fruit', quantity: 10, price: 15 },
  { name: 'ground lamb', type: 'meat', quantity: 30, price: 13 },
  { name: 'celery', type: 'vegetable', quantity: 3, price: 5 }
];

// Type is veg, qty is > 0, price < 10
products.filter(function(product) {
	return product.type === 'vegetable' 
    && product.quantity > 0 
    && product.price < 10;
});
```

#### Choosing when to Filter

The `filter` method can be used whenever there is relational data that needs to be organized, etc.

### The 'find' Helper

#### Querying for Records with Find

Once the `find` method returns a true value, the method returns that object and stops its work. If there are multiple elements in the array that would match what `find` is looking for then only the first element in the array will be returned.

#### Find Continued

```javascript
/*
function Car(model) {
  this.model = model;
};

var cars = [
  new Car('Buick'),
  new Car('Camaro'),
  new Car('Focus')
];

cars.find(function(car) {
  return car.model === 'Buick';
});
*/

var posts = [
  { id: 1, title: 'Old Post' },
  { id: 2, title: 'New Post' }
];

var comment = { postId: 1, content: 'Great Post' };

function postForComment(posts, comment) {
	return posts.find(function(post) {
  	return post.id === comment.postId;
  })
}

postForComment(posts, comment);
```

#### Using Find to Search for Users

Put id in url, as in `forum.com/posts/45`, then, given the url with an id signifier of 45, find which post to display in an array of posts.

### The 'every' and 'some' Helper

#### A Little Every and a Lot of Some

The `every` method checks to see if all the elements in an array matches some condition and returns true if ALL the elements match and false if ANY of the elements return false.

#### More on Every and Some

The `some` method asks if ANY (or all) of the elements in an array match some criteria and returns true if so, false if not.

```javascript
var computers = [
  { name: 'Apple', ram: 24 },
  { name: 'Compaq', ram: 4 },
  { name: 'Acer', ram: 32 }
];

var allComputersCanRunProgram = true;
var onlySomeComputersCanRunProgram = false;

computers.every(function(computer) {
  return computer.ram >= 16;
});

computers.some(function(computer) {
  return computer.ram >= 16;
});
```

#### Every and Some Syntax

```javascript
var names = [
  "Albert",
  "Bob",
  "Edward"
];

names.every(function(name) {
  return name.length > 4;
});

names.some(function(name) {
  return name.length > 4;
});
```

#### Every and Some in Practice

The `every` method can be used to check if all the necessary fields in a form have inputted values or that they validate properly or the like.

### The 'reduce' Helper

#### Condensing Lists with Reduce

Similar to `forEach`, the `reduce` helper is very flexible and can likely copy the functionality of the other helpers if needed.

#### A Touch More of Reduce

```javascript
var primaryColors = [
  {color: 'red'},
  {color: 'yellow'},
  {color: 'blue'}
];

primaryColors.reduce(function(prev, primary) {
	prev.push(primary.color);
  return prev;
}, []);
```

#### Ace Your Next Interview with Reduce

Reduce is not just for summing numbers!

```javascript
// Balanced Parenthesis Problem
// Are the parenthesis balanced?
// i.e this: '(())' or '()()'
//  and not this: '))' or '(()'

function isBalanced(string) {
  return !string.split('').reduce(function(prev, char) {
    if (prev < 0) { return prev };
  	if (char === '(') { return ++prev };
    if (char === ')') { return --prev };
    return prev;
  }, 0);
};

isBalanced('(((');
isBalanced('()()');
isBalanced('(())');
isBalanced('))((');
```

### Const/Let

#### Variable Declarations with Const and Let

In ES6 do not use `var`. Ever.

`const` is for variables that will not change (cannot).

`let` is for variables that are expected to change over time.

```javascript
// ES5
var name = 'Jane';
var title = 'Software Engineer';
var hourlyWage = 40;

// ES6
const es6Name = 'Jane';
let es6Title = 'Software Engineer';
let es6HourlyWage = 40;

// some time later...

es6Title = 'Senior Software Engineer';
es6HourlyWage += 20;
```

#### What Const and Let Solve

Using `const` and `let` make code more legible by communicating expectations for the variables.

### Template Strings

#### Template Strings

Also known as template literals

```javascript
// ES5
function getMessage() {
	const year = new Date().getFullYear();
  return "The year is " + year + " ES5 style.";
}
getMessage();
// ES6
function es6GetMessage() {
  const year2 = new Date().getFullYear();
  return `The year is ${year2} ES6 syle`;
}
es6GetMessage();
```

#### When to Reach for Template Strings

Template strings can be much more legible, especially in complicated string concatenation situations, than using `+` to concatenate.

### Arrow Functions

#### Fat Arrow Functions

Instead of `const fn = function(x) {}`, arrow functions are written as `const fn = (x) => {}`

If the function consists of a single return it can be written as `const fn = (x,y) => a + b;`, omitting the `return` keyword and the curly braces.

#### Advanced Use of Arrow Functions

The single line arrow function syntax can also work without the parenthesis around a single arguemnt (no more), as in `const fn = num => num/2;`

There are a lot of rules regarding arrow functions that can be difficult to keep in mind.

Arrow functions are very useful in providing function arguments to the array helper functions, i.e. `numbers.map(num => 2 * num);`

#### When to Use Arrow Functions

```javascript
// The teamSummary function does not work properly
//  because the interior `this` variable does not
//  point to the object when it's executed.
const team = {
 	members: ['Jane', 'Bill'],
  teamName: 'Super Squad',
  teamSummary: function() {
    	return this.members.map(function(member) {
      		return `${member} is on team ${this.teamName}`;
      });
  }
};
// This results in an undefined error
team.teamSummary();
```

#### When to Use Arrow Functions Continued

Arrow functions use the lexical `this`

```javascript
const team = {
 	members: ['Jane', 'Bill'],
  teamName: 'Super Squad',
  teamSummary: function() {
    	return this.members.map((member) => {
      		return `${member} is on team ${this.teamName}`;
      });
  }
};
// This results in the correct behavior
team.teamSummary();
```

### Enhanced Object Literals

#### Enhanced Object Literals



### Default Function Arguments

### Rest and Spread Operator

### Destructuring

### Classes

### Generators

### Promises and Fetch