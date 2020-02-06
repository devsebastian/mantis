import React from 'react';
import './App.css';
import WindowBar from './components/window-bar/window-bar'
import StatusBar from './components/status-bar/status-bar';
import getMenu from './assets/menu'
import Tabs from './components/tabs/tabs';
import Terminal from './components/terminal/terminal';
import Editor from './components/editor/editor';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      cm: {
        line: 0,
        ch: 0
      },
      terminalIsOpen: false,
      terminalMessage: [],
      activeTabIndex: 0,
      tabs: [
        { title: "untitled", data: "#include<iostream>\n#include<conio.h>\nusing namespace std;\nint main(){\n\tcout<<\"dev\";\n\tgetch();\n\treturn 0;\n}", url: "" },
      ]
    }
    this.editor = null

    this.setActiveTab = this.setActiveTab.bind(this)
    this.addTab = this.addTab.bind(this)
    this.closeTab = this.closeTab.bind(this)
    this.setTabContent = this.setTabContent.bind(this)

    this.append = this.append.bind(this)
    this.write = this.write.bind(this)
    this.setFilename = this.setFilename.bind(this)
    this.clearTerminal = this.clearTerminal.bind(this);
    this.toggleTerminalVisibility = this.toggleTerminalVisibility.bind(this)
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

  clearTerminal() {
    this.setState({ terminalMessage: [] })
  }

  toggleTerminalVisibility() {
    this.setState(oldState => { return { terminalIsOpen: !oldState.terminalIsOpen } })
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <WindowBar
          menu={getMenu({
            activeTab: this.state.tabs[this.state.activeTabIndex],
            append: this.append,
            setFilename: this.setFilename,
            addTab: this.addTab,
            clearTerminal: this.clearTerminal
          })}
          setActiveTab={this.setActiveTab}
          tabs={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
        />
        <Tabs tabs={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          addTab={this.addTab}
          closeTab={this.closeTab}
          setActiveTab={this.setActiveTab} />
        {/* <Editor setTabContent={this.setTabContent} data={this.state.tabs[this.state.activeTabIndex].data} /> */}
        <Editor setTabContent={this.setTabContent}
          value={this.state.tabs[this.state.activeTabIndex].data} />
        <Terminal
          terminalIsOpen={this.state.terminalIsOpen}
          filename={this.state.tabs[this.state.activeTabIndex].filename}
          messages={this.state.terminalMessage}
          setLine={(line, ch) => this.setState({
            cm: {
              line: line,
              ch: ch
            }
          })} />
        <StatusBar options={this.state.cm} toggleTerminalVisibility={this.toggleTerminalVisibility} />
      </div>
    );
  }
}

export default App;
