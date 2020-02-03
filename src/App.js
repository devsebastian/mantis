import React from 'react';
import './App.css';
import WindowBar from './components/window-bar/window-bar'
import StatusBar from './components/status-bar/status-bar';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'
import 'codemirror/addon/edit/matchbrackets'
import './editor.css'
import Tabs from './components/tabs/tabs';
import Terminal from './components/terminal/terminal';

var fs = window.require('fs');

import { open, compileAndRun, saveAs, compile } from './assets/crud'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      terminalMessage: [],
      activeTabIndex: 0,
      tabs: [
        { title: "Codeforces_69A", data: "#include<iostream>\n#include<conio.h>\nusing namespace std;\nint main(){\n\tcout<<\"dev\";\n\tgetch();\n\treturn 0;\n}", url: "" },
        { title: "Dev Sebastian", data: "class Joe Sebastian{\n\tint num=12\n}" },
        { title: "HackerEarth_1A" },
        { title: "CodeChef_215B" },
        { title: "Codeforces_256B" }]
    }
    this.editor = null

    globalShortcut.register('Ctrl+w', () => {
      this.setState(oldState => {
        var tabs = oldState.tabs
        tabs.splice([oldState.activeTabIndex], 1);
        return { tabs: tabs }
      })
    })

    globalShortcut.register('Ctrl+n', () => {
      this.addTab("untitled");
      this.setState({ activeTabIndex: this.states.tabs.length - 1 })
    })

    globalShortcut.register('Ctrl+r', () => {
      this.run();
    })

    globalShortcut.register('Shift+s', () => {
      this.save();

    })
    this.setActiveTab = this.setActiveTab.bind(this)
    this.addTab = this.addTab.bind(this)
    this.closeTab = this.closeTab.bind(this)
    this.setTabContent = this.setTabContent.bind(this)

    this.append = this.append.bind(this)
    this.write = this.write.bind(this)
    this.setFilename = this.setFilename.bind(this)
  }

  write(message) {
    this.setState({ terminalMessage: message })
  }

  append(message) {
    this.setState(oldState => {
      var m = oldState.terminalMessage;
      m = [...m, message];
      return { terminalMessage: m }
    })
  }

  setActiveTab(pos) {
    this.setState({ activeTabIndex: pos })
  }

  setTabContent(data) {
    this.setState(oldState => {
      var tabs = oldState.tabs;
      tabs[oldState.activeTabIndex].data = data;
      return { tabs: tabs }
    })
  }

  addTab(title) {
    this.setState(oldState => {
      var tabs = [...oldState.tabs, { title: title }]
      return { tabs: tabs };
    })
  }

  closeTab(pos) {
    this.setState(oldState => {
      var tabs = oldState.tabs;
      tabs.splice(pos, 1)
      return { tabs: tabs };
    })
  }

  setFilename(filename) {
    this.setState(oldState => {
      var tabs = oldState.tabs;
      tabs[oldState.activeTabIndex].filename = filename;
      tabs[oldState.activeTabIndex].title = filename.split("\\").pop();
      return { tabs: tabs }
    })
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <WindowBar
          setActiveTab={this.setActiveTab}
          tabs={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          menu={[
            {
              title: "Save",
              action: () => {
                saveAs(this.state.tabs[this.state.activeTabIndex].data, (filename) => {
                  this.setFilename(filename)
                })
              }
            }, {
              title: "Compile",
              action: () => {
                compile(this.state.tabs[this.state.activeTabIndex].filename, this.state.tabs[this.state.activeTabIndex].data, (filename) => {
                  this.setState({ terminalMessage: [] })
                  this.setFilename(filename);
                }, this.append)
              }
            }, {
              title: "Compile And Run",
              action: () => {
                compileAndRun(this.state.tabs[this.state.activeTabIndex].filename, this.state.tabs[this.state.activeTabIndex].data, (filename) => {
                  this.setState({ terminalMessage: [] })
                  this.setFilename(filename);
                }, this.append)
              }
            }, {
              title: "Run",
              action: () => {
                open(this.state.tabs[this.state.activeTabIndex].filename.replace(".cpp", ".exe"), this.append)
              }
            }
          ]} />
        <Tabs tabs={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          addTab={this.addTab}
          closeTab={this.closeTab}
          setActiveTab={this.setActiveTab} />
        {/* <Editor setTabContent={this.setTabContent} data={this.state.tabs[this.state.activeTabIndex].data} /> */}
        <CodeMirror onBeforeChange={(editor, data, value) => { this.setTabContent(value) }} value={this.state.tabs[this.state.activeTabIndex].data} options={{
          lineNumbers: true, mode: "text/x-c++src",
          indentWithTabs: true,
          lineNumbers: true,
          indentUnit: 4,
          matchBrackets: true,
        }}

          editorDidMount={e => { this.editor = e }} />
        <Terminal filename={this.state.tabs[this.state.activeTabIndex].filename}
          messages={this.state.terminalMessage} />
        <StatusBar />
      </div>
    );
  }
}

export default App;
