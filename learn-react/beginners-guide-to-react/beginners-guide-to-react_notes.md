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

        class StopWatch extends React.Component {
            state = {lapse: 0, running: false};
            handleRunClick = () => {                
                this.setState(state => {
                    if (state.running) {
                        clearInterval(this.timer);
                    } else {
                        const startTime = Date.now() - this.state.lapse;
                        this.timer = setInterval(() => {                            
                            this.setState({lapse: Date.now() - startTime});
                        })
                    }
                    return {running: !state.running};
                });                
            };
            handleClearClick = () => {
                clearInterval(this.timer);
                this.setState({lapse: 0, running: false});
            };
            render() {
                const {lapse, running} = this.state;
                const buttonStyles = {
                    border: '1px solid #ccc',
                    background: '#fff',
                    fontSize: '2em',
                    padding: 15,
                    margin: 5,
                    width: 200,
                }            
                return (
                    <div style={{textAlign: 'center'}}>
                        <label
                            style={{fontSize: '5em', display: 'block'}}
                        >
                            {lapse}ms
                        </label>
                        <button onClick={this.handleRunClick} style={buttonStyles}>{running ? 'Stop' : 'Start' }</button>
                        <button onClick={this.handleClearClick} style={buttonStyles}>Clear</button>
                    </div>
                )
            }
        }
 
        const element = <StopWatch/>
        ReactDOM.render(element, rootElement);
    </script>
</body>
```

The above implementation has a memory leak that will be addressed in another lesson.

#### Stop Memory Leaks with componentWillUnmount Lifecycle Method in React

```javascript
// Add this to the above implementation to fix the memory leak
componentWillUnmount() {
    clearInterval(this.timer);
}
```

#### Use Class Components with React

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

        class Counter extends React.Component {
            state = {count: 0};
            // Using the arrow fn avoids problems with `this`
            handleClick = () => {
                this.setState(({count}) => ({
                    count: count + 1,
                }));
            }
            render() {
                return (
                    <button onClick={this.handleClick}>
                        {this.state.count}
                    </button>
                );
            }
        }

        const element = <Counter/>;
        ReactDOM.render(element, rootElement);
    </script>
</body>
```

#### Manipulate the DOM with React refs

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World</title>
</head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
    <script src="https://unpkg.com/vanilla-tilt@1.4.1/dist/vanilla-tilt.min.js"></script>
    <style>
            /*
            Taken from the vanilla-tilt.js demo site:
            https://micku7zu.github.io/vanilla-tilt.js/index.html
            */
            .tilt-root {
                height: 150px;
                background-color: red;
                width: 200px;
                background-image: -webkit-linear-gradient(315deg, #ff00ba 0%, #fae713 100%);
                background-image: linear-gradient(135deg, #ff00ba 0%, #fae713 100%);
                transform-style: preserve-3d;
                will-change: transform;
                transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
            }
            .tilt-child {
                position: absolute;
                width: 50%;
                height: 50%;
                top: 50%;
                left: 50%;
                transform: translateZ(30px) translateX(-50%) translateY(-50%);
                box-shadow: 0 0 50px 0 rgba(51, 51, 51, 0.3);
                background-color: white;
            }
            .totally-centered {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
    </style>
    <script type = "text/babel">
        const rootElement = document.getElementById('root');

        class Tilt extends React.Component {
            componentDidMount() {
                VanillaTilt.init(this.rootNode, {
                    max: 25,
                    speed: 400,
                    glare: true,
                    'max-glare': 0.5,
                })
            }
            render() {
                return(
                    <div 
                        ref={node => (this.rootNode = node)}
                        className="tilt-root"
                    >
                        <div className="tilt-child">
                            <div {...this.props} />
                        </div>
                    </div>
                );
            }
        }

        const element = (
            <div className="totally-centered">
                <Tilt>
                    <div className="totally-centered">
                        vanilla-tilt.js
                    </div>
                </Tilt>
            </div>
        );
        ReactDOM.render(element, rootElement);
    </script>
</body>
```

#### Make Basic Forms with React

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

        class NameForm extends React.Component {
            handleSubmit = event => {
                event.preventDefault();
                console.log({target: event.target});
                console.log(event.target[0].value);
                console.log(
                    event.target.elements.username.value
                );
                console.log(this.inputNode.value);
            }
            render() {
                return (
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="username" ref={node => this.inputNode = node}/>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                )
            }
        }

        const element = <NameForm/>
        ReactDOM.render(element, rootElement);
    </script>
</body>
```

#### Make Dynamic Forms with React

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

        class NameForm extends React.Component {
            state = {error: this.props.getErrorMessage('')};
            handleChange = (event) => {
                const {value} = event.target;
                this.setState({
                    error: this.props.getErrorMessage(value)
                })
            }
            handleSubmit = event => {
                event.preventDefault();
                const value = event.target.elements.username.value;
                const error = this.props.getErrorMessage(value);
                if (error) {
                    alert(`error: ${error}`);
                }  else {
                    alert(`success: ${value}`);
                }
            }
            render() {
                const {error} = this.state;
                return (
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input onChange={this.handleChange} type="text" name="username" ref={node => this.inputNode = node}/>
                        </label>
                        {error ? <div style={{color: 'red'}}>{error}</div> : null}
                        <button disabled={Boolean(error)} type="submit">Submit</button>
                    </form>
                )
            }
        }

        const element = <NameForm
                            getErrorMessage={value => {
                                if (value.length < 3) {
                                    return 'Val must be at least 3 chars.';
                                }
                                if (!value.includes('s')) {
                                    return 'Val does not include "s" but it should';
                                }    
                                return null
                            }}
                            />;
        ReactDOM.render(element, rootElement);
    </script>
</body>
```

#### Controlling Form Values with React

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World</title>
</head>
<body>
<div id="root"></div>
<script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script type="text/babel">
  class MyFancyForm extends React.Component {
    static availableOptions = [
      'apple',
      'grape',
      'cherry',
      'orange',
      'pear',
      'peach',
    ]
    state = {
      multiline: '',
      commaSeparated: '',
      multiSelect: [],
    }
    handleCommaSeparatedChange = event => {
      const {value} = event.target
      const allVals = value
        .split(',')
        .map(v => v.trim())
        .filter(Boolean)
      this.setState({
        commaSeparated: value,
        multiline: allVals.join('\n'),
        multiSelect: allVals.filter(v =>
          MyFancyForm.availableOptions.includes(v),
        ),
      })
    }
    handleMultilineChange = event => {
      const {value} = event.target
      const allVals = value
        .split('\n')
        .map(v => v.trim())
        .filter(Boolean)
      this.setState({
        multiline: value,
        commaSeparated: allVals.join(','),
        multiSelect: allVals.filter(v =>
          MyFancyForm.availableOptions.includes(v),
        ),
      })
    }
    handleMultiSelectChange = event => {
      const allVals = Array.from(
        event.target.selectedOptions,
      ).map(o => o.value)
      this.setState({
        multiSelect: allVals,
        multiline: allVals.join('\n'),
        commaSeparated: allVals.join(','),
      })
    }
    render() {
      const {
        commaSeparated,
        multiline,
        multiSelect,
      } = this.state
      return (
        <form>
          <div>
            <label>
              comma separated values:
              <br />
              <input
                type="text"
                value={commaSeparated}
                onChange={
                  this.handleCommaSeparatedChange
                }
              />
            </label>
          </div>
          <div>
            <label>
              multiline values:
              <br />
              <textarea
                value={multiline}
                rows={
                  MyFancyForm.availableOptions
                    .length
                }
                onChange={
                  this.handleMultilineChange
                }
              />
            </label>
          </div>
          <div>
            <label>
              multiSelect values:
              <br />
              <select
                multiple
                value={multiSelect}
                size={
                  MyFancyForm.availableOptions
                    .length
                }
                onChange={
                  this.handleMultiSelectChange
                }
              >
                {MyFancyForm.availableOptions.map(
                  optionValue => (
                    <option
                      key={optionValue}
                      value={optionValue}
                    >
                      {optionValue}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>
        </form>
      )
    }
  }
  ReactDOM.render(
    <MyFancyForm />,
    document.getElementById('root'),
  )
</script>
</body>
</html>
```

#### Use the key prop when Rendering a List with React

When rendering children of a list, React requires each of those to be passed with a key so to keep track of additions and subtractions.

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

        class App extends React.Component {
            static allItems = [
                {id: 'a', value: 'apple'},
                {id: 'o', value: 'orange'},
                {id: 'g', value: 'grape'},
                {id: 'p', value: 'pear'},
            ];
            render() {
                return (
                    <div>
                        {App.allItems.map(item => (
                            <div key={item.id}>{item.value}</div>
                        ))}
                    </div>
                )
            }
        }

        const element = <App/>
        ReactDOM.render(element, rootElement);
    </script>
</body>
```

#### Make HTTP Requests with React

```javascript
<head></head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>
    <script type = "text/babel">
        const rootElement = document.getElementById('root');

        class UserCompany extends React.Component {
            state = {company: undefined, loaded: false};
            componentDidMount() {
                axios({
                    url: 'https://api.github.com/graphql',
                    method: 'post',
                    data: {
                        query: `{
                            user(login: "${this.props.username}") {
                                company
                            }
                        }`,
                    },
                    headers: {
                        Authorization: `bearer TOKEN`
                    },
                }).then(response => {
                    this.setState({
                        loaded: true,
                        company: response.data.data.user.company,
                    })
                }, error => {
                    this.setState({
                        error,
                        loaded: true,
                    })
                })
            };
            render() {
                return (
                    this.state.loaded ? this.state.company  || 'Unknown' : '...'                )
            }
        }
        const username = 'rjuall';
        const element = (
            <div>
                <div>
                    {`@${username} works at `}
                    <UserCompany username={username}/>
                </div>
            </div>
        )

        ReactDOM.render(element, rootElement);
    </script>
</body>
```

#### Build and Deploy a React Application

CodeSandbox can be a React playground or development environment