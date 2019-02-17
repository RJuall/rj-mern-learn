# The Beginner's Guide to ReactJS

## Kent C. Dodds

*https://egghead.io/courses/the-beginner-s-guide-to-react*

### 2/16/19

#### Introduction to The Beginner's Guide to ReactJS

React is just JS. Just objects and functions.

#### Create HTML Elements with React's createElement API

React objects are of the `Symbol()` type

```javascript
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script type = "text/javascript">
    // const rootElement = document.getElementById('root');
    // const element = document.createElement('div');
    // element.textContent = 'HELLO WORLD';
    // element.className = 'container';
    // rootElement.appendChild(element);
    const rootElement = document.getElementById('root');
    const element = React.createElement(
        'div', 
        {className: 'container',
        children: (['HELLO WORLD', ' GOODBYE WORLD'])
        });
    ReactDOM.render(element, rootElement);
</script>
```

#### Replace React createElement Function Call with JSX

`createElement` could be used to construct a web app, but would be unwieldy. This is why `JSX` was created.

`babel.js` has a standalone library that can be imported via cdn.

In `JSX` `class` becomes `className`.

Interpolation can be used in `JSX` to create content. Anything that evaluates to an expression can be used in the interpolation.

`const element = <div className="container>{(() => content)()}</div>`

```javascript
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
<script type = "text/babel">
    const rootElement = document.getElementById('root');
    // const element = React.createElement(
    //     'div', 
    //     {className: 'container',
    //     children: (['HELLO WORLD', ' GOODBYE WORLD'])
    //     });
    const content = 'HELLO WORLD';
    const myClassName = 'container';
    const props = {
        className: 'container',
        children: 'HELLO WORLD'
    }
    const element = (
        <div {...props} />
    )
    ReactDOM.render(element, rootElement);
</script>
```

#### Create a Simple Reusable React Component



#### Validate Custom React Component Props with PropTypes

#### Conditionally Render a React Component

#### Rerender a React Application

#### Style React Components With className and In Line Styles

#### Use Event Handlers with React

#### Use Component State With React

#### Stop Memory Leaks with componentWillUnmount Lifecycle Method in React

#### Use Class Components with React

#### Manipulate the DOM with React refs

#### Make Basic Forms with React

#### Make Dynamic Forms with React

#### Controlling Form Values with React

#### Use the key prop when Rendering a List with React

#### Make HTTP Requests with React

#### Build and Deploy a React Application