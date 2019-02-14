import React, { Component } from 'react';
import * as os from 'os';
import * as pty from 'node-pty';
import logo from './logo.svg';
import './App.css';
import { Terminal } from 'xterm';
// import * as attach from 'xterm/lib/addons/attach/attach';
import * as attach from '../addons/attach';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';

Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(fullscreen);
Terminal.applyAddon(search);
Terminal.applyAddon(winptyCompat);

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

class App extends Component {
  render() {
    return (
      <div className="App">
 
      </div>
    );
  }
}

export default App;
