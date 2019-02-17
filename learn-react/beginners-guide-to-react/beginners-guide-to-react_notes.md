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

```javascript
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
<script type = "text/babel">
    const rootElement = document.getElementById('root');
    const message = (props) => <div>{props.msg}</div>;
    const element = (
        <div className="container">
            {message({msg: 'HELLO WORLD'})}
            {message({msg: 'GOODBYE WORLD'})}
        </div>
    )

    ReactDOM.render(element, rootElement);
</script>
```

Capitalization is important in React, means that angle bracket notation (i.e. HTML-style) can be used as a shortcut for `React.createElement` in `JSX`.

Create a fn with a capitalized name, this fn should accept props. It can then be used similarly to an HTML element. `children` props are passed in between opening and closing tags, just like HTML elements (i.e. `<arbitrary>CHILDREN</arbitrary>`)

```javascript
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
<script type = "text/babel">
    const rootElement = document.getElementById('root');
    
    const Message = (props) => <div>{props.children}</div>;
    const element = (
        <div className="container">
            <Message>HELLO WORLD</Message>
            <Message>GOODBYE WORLD</Message>
        </div>
    );

    ReactDOM.render(element, rootElement);
</script>
```

#### Validate Custom React Component Props with PropTypes

```javascript
<head></head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
    <script type = "text/babel">
        const rootElement = document.getElementById('root');
        
        function SayHello(props) {
            return (
                <div>
                    Hello {props.firstName} {props.lastName} !
                </div>
            )
        }

        SayHello.propTypes = {
            firstName: PropTypes.string,
            lastName: PropTypes.string
        }

        SayHello.propTypes = {
            string(props, propName, componentName) {
                if (typeof props[propName] !== 'string') {
                    return new Error(
                        `Hey, you should pass a string for ${propName} in ${componentName}, but you passed a ${typeof(props[propName])}.`
                    )
                }
            }
        }

        const element = <SayHello firstName={true}></SayHello>

        ReactDOM.render(element, rootElement);
    </script>
</body>
```

```javascript
<head></head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
    <script type = "text/babel">
        const rootElement = document.getElementById('root');
        
        class SayHello extends React.Component {
            static propTypes = {
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired
            }
            render() {
                const {firstName, lastName} = this.props;
                return (
                    <div>
                        Hello {firstName} {lastName} !
                    </div>
                )
            }
        }
        const element = <SayHello firstName="Tom" lastName="Brady"></SayHello>;

        ReactDOM.render(element, rootElement);
    </script>
</body>
```

The `prop-types` library is not used in production as it is intended to be a useful tool for development only.

#### Conditionally Render a React Component

```javascript
<head></head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
    <script type = "text/babel">
        const rootElement = document.getElementById('root');

        function Message({message}) {
            return (
                <div>
                {message ? (
                    <div>{message}</div>
                ) : (
                    <div>No Message</div>
                )}
                </div>
            )
        }

        const element = <Message message=""></Message>
        ReactDOM.render(element, rootElement);
    </script>
</body>
```

Ternary conditionals can be used within the curly braces, whereas if/else statements cannot.

#### Rerender a React Application

Whenever React rerenders an element, it only affects the areas of the DOM that are necessary to change. This means that focus will not be lost on rerender, for example.

```javascript
<head></head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
    <script type = "text/babel">
        const rootElement = document.getElementById('root');

        function tick() {
            const time = new Date().toLocaleTimeString();        
            const element = (
                <div> 
                    It is 
                    <input value={time}/>
                    <input value={time}/>
                </div>
            );
            //rootElement.innerHTML = element;
            ReactDOM.render(element, rootElement);
        }
        tick();
        setInterval(tick, 1000);
    </script>
</body>
```

#### Style React Components With className and In Line Styles

```javascript
<head></head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
    
    <style>
        .box {
            border: 1px solid;
        }
        .box--small {
            width: 60px;
            height: 60px;
        }
        .box--medium {
            width: 120px;
            height: 120px;
        }
        .box--large {
            width: 240px;
            height: 240px;
        }
    </style>
    
    <script type = "text/babel">
        const rootElement = document.getElementById('root');        
        
        function Box({style, size, className = '', ...rest}) {
            const sizeClassName = size ? `box--${size}` : '';
            return (
                <div 
                    className={`box ${className} ${sizeClassName}`}
                    style={{paddingLeft: 20, ...style}}
                    {...rest}
                />
            )
        }
        const element = (
            <div>
                <Box 
                    size="small"
                    style={{backgroundColor: 'lightblue'}}
                >Small Box</Box>
                <Box 
                    size="medium"
                    style={{backgroundColor: 'pink'}}
                >Medium Box</Box>
                <Box 
                    size="large"
                    style={{backgroundColor: 'orange'}}
                >Large Box</Box>
            </div>
        );

        ReactDOM.render(element, rootElement);
    </script>
</body>
```

In-line styles are not vendor prefixed out of the box.

#### Use Event Handlers with React

```javascript
<head></head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
    <script type = "text/babel">
        const rootElement = document.getElementById('root');

        const state = {eventCount: 0, username: ''}
        function App() {
            return (
                <div>
                    <p>
                        There have been {state.eventCount} events
                    </p>
                    <p>
                        <button onClick={() => 
                            setState({
                            eventCount: state.eventCount + 1
                        })}>
                            X
                        </button>
                    </p>
                    <p>You Typed: {state.username}</p>
                    <p>
                        <input onChange={event => setState({username: event.target.value})}/>
                    </p>
                </div>
            )
        }

        function setState(newState) {
            Object.assign(state, newState);
            renderApp();
        }
        function renderApp() {
            ReactDOM.render(
                <App />,
                document.getElementById('root'),
            )
        }
        renderApp();

    </script>
</body>
```

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