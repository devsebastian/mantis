import React from 'react';
import './App.css';
import WindowBar from './components/window-bar/window-bar'
import StatusBar from './components/status-bar/status-bar';
import getMenu from './assets/menu'
import Tabs from './components/tabs/tabs';
import Terminal from './components/terminal/terminal';
import Editor from './components/editor/editor';
import Explorer from './components/explorer/explorer';

const Store = window.require('electron-store')

class App extends React.Component {

  // componentDidMount() {
  //   const store = new Store();
  //   this.setState({
  //     activeTabIndex: store.get('activeTabIndex'),
  //     terminalIsOpen: store.get('terminalIsOpen'),
  //     terminalMessage: store.get('terminalMessage'),
  //     tabs: store.get('tabs'),
  //     cm: store.get('cm')
  //   })

  //   window.addEventListener('unload', (e) => {
  //     var store = new Store();
  //     store.set('activeTabIndex', this.state.activeTabIndex)
  //     store.set('terminalIsOpen', this.state.terminalIsOpen)
  //     store.set('terminalMessage', this.state.terminalMessage)
  //     store.set('tabs', this.state.tabs)
  //     store.set('cm', this.state.cm)
  //   })
  // }


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
        { title: "untitled" },
      ],
      files: [

      ]
      // panes: [
      //   { tabs: [{ title: "untitled", data: "#include<iostream>\n#include<conio.h>\nusing namespace std;\nint main(){\n\tcout<<\"dev\";\n\tgetch();\n\treturn 0;\n}", url: "" },] },
      //   { tabs: [{ title: "untitled", data: "#include<iostream>\n#include<conio.h>\nusing namespace std;\nint main(){\n\tcout<<\"dev\";\n\tgetch();\n\treturn 0;\n}", url: "" },] }
      // ]
    }

    this.setActiveTab = this.setActiveTab.bind(this)
    this.addTab = this.addTab.bind(this)
    this.addTabs = this.addTabs.bind(this)
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

  addTab(path, data, p) {
    this.setState(oldState => {
      var tabs = [...oldState.tabs, { title: path, data: data, filename: p }]
      return { tabs: tabs, activeTabIndex: tabs.length - 1 };
    })
  }


  addTabs(tabs) {
    console.log(this.state.tabs)
    console.log(tabs)
    this.setState(oldState => {
      return { tabs: [...oldState.tabs, ...tabs], activeTabIndex: oldState.tabs.length + tabs.length-1 };
    })
  }

  closeTab(pos) {
    if ((pos > 0 && this.state.activeTabIndex > 0) || this.state.tabs.length > 1) {
      this.setState(oldState => {
        var tabs = oldState.tabs;
        var activeTabIndex = oldState.activeTabIndex
        if (pos <= oldState.activeTabIndex) activeTabIndex--;
        tabs.splice(pos, 1)
        return { tabs: tabs, activeTabIndex: activeTabIndex };
      })
    } else {
      this.setState({ activeTabIndex: 0, tabs: [{ title: "Untitled" }] })
    }
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
    console.log(this.state.tabs)
    const { tabs, activeTabIndex, terminalIsOpen, terminalMessage, cm } = this.state
    const activeTab = tabs[activeTabIndex]
    return (
      <div className="app-wrapper">
        <WindowBar
          title={activeTab.filename}
          menu={getMenu({
            addTabs: this.addTabs,
            activeTab: activeTab,
            append: this.append,
            setFilename: this.setFilename,
            addTab: this.addTab,
            clearTerminal: this.clearTerminal,
          })}
          setActiveTab={activeTab}
          tabs={tabs}
          activeTabIndex={activeTabIndex}
        />

        <div className="pane-wrapper">
          <Explorer files={this.state.files} />
          <div className="main-pane">
            <Tabs
              tabs={tabs}
              activeTabIndex={activeTabIndex}
              addTab={this.addTab}
              closeTab={this.closeTab}
              setActiveTab={this.setActiveTab} />
            <Editor
              setTabContent={this.setTabContent}
              value={activeTab.data}
              setLine={(line, ch) => this.setState({
                cm: {
                  line: line,
                  ch: ch
                }
              })} />
            <Terminal
              terminalIsOpen={terminalIsOpen}
              filename={activeTab.filename}
              messages={terminalMessage}
            />
          </div>
        </div>



        <StatusBar options={cm} toggleTerminalVisibility={this.toggleTerminalVisibility} />
      </div>
    );
  }
}

export default App;
