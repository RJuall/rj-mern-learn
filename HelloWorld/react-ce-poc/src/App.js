import React, { Component } from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import logo from './logo.svg';
import 'brace/mode/haskell';
import 'brace/theme/solarized_dark';
import { XTerm, Terminal } from 'xterm';
import { ResizableBox } from 'react-resizable';
import * as throttle from 'lodash.throttle';
import './App.css';
import '../node_modules/xterm/dist/xterm.css';

function onChange(newVal) {
  console.log('change', newVal);
}

this.refs.xterm = Terminal;

class App extends Component {
  componentDidMount() {
    runFakeTerminal(this.refs.xterm);
  }

  render() {
    return (
      <div className="App">
        <h1>HELLO WORLD</h1>
        <div className="AceEditor">
          <AceEditor
            mode="haskell"
            theme="solarized_dark"
            onChange={onChange}
            name="ace-ed"
            editorProps={{$blockScrolling: true}}
          />
        </div>
        <div id="terminal" className="XTerm">
          <ResizableBox width={200} height={200} onResize={this.throttleConsoleResize} style={{
              overflow: 'hidden'
          }} >
            <XTerm ref='xterm' style={{
              addons:['fit', 'fullscreen', 'search'],
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
              height: '100%'  
            }} />
          </ResizableBox>
        </div>
      </div>
    );
  }
}

function runFakeTerminal(xterm) {
  const term = xterm.getTerminal();
  let shellprompt = '$';

  function prompt() {
    xterm.write('\r\n' + shellprompt);
  };
  xterm.writeln('');
}

export default App;
