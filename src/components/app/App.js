import React from 'react';
import './App.css';
import WindowBar from '../window-bar/window-bar'
import StatusBar from '../status-bar/status-bar';
import { getMenus } from '../../assets/menu'
import Tabs from '../tabs/tabs';
import Terminal from '../terminal/terminal';
import Editor from '../editor/editor';
import Explorer from '../explorer/explorer';
import { compile, run, compileAndRun } from '../../assets/crud';
import { SolarisedDark, Monokai } from '../../assets/themes/styles'

const { app } = window.require('electron').remote
const fs = window.require('fs')
const Store = window.require('electron-store')

class App extends React.Component {

  setTheme() {
    var theme = Monokai()
    Object.keys(theme).forEach(key => {
      document.body.style.setProperty('--' + key, theme[key])
    });
  }

  componentDidMount() {
    this.setTheme();

    const store = new Store();
    this.setState({
      activeTabIndex: store.get('activeTabIndex'),
      terminalIsOpen: store.get('terminalIsOpen'),
      terminalMessage: store.get('terminalMessage'),
      tabs: store.get('tabs'),
      files: store.get('files'),
      cm: store.get('cm')
    })

    window.addEventListener('unload', (e) => {
      var store = new Store();
      store.set('activeTabIndex', this.state.activeTabIndex)
      store.set('terminalIsOpen', this.state.terminalIsOpen)
      store.set('terminalMessage', this.state.terminalMessage)
      store.set('tabs', this.state.tabs)
      store.set('cm', this.state.cm)
      store.set('files', this.state.files)
    })
  }


  constructor() {
    super();
    this.state = {
      cm: {
        line: 0,
        ch: 0
      },
      theme: "monokai",
      terminalIsOpen: false,
      terminalMessage: [],
      activeTabIndex: 0,
      tabs: [
        { title: "untitled" },
      ],
      files: []
    }

    this.setActiveTab = this.setActiveTab.bind(this)
    this.addTab = this.addTab.bind(this)
    this.addTabs = this.addTabs.bind(this)
    this.closeTab = this.closeTab.bind(this)
    this.setTabContent = this.setTabContent.bind(this)
    this.append = this.append.bind(this)
    this.write = this.write.bind(this)
    this.setPath = this.setPath.bind(this)
    this.setFiles = this.setFiles.bind(this)
    this.clearTerminal = this.clearTerminal.bind(this);
    this.toggleTerminalVisibility = this.toggleTerminalVisibility.bind(this)
    this.openTerminal = this.openTerminal.bind(this)
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

  addTab(title, data, path) {
    var tabs = this.state.tabs;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].path === path) {
        this.setActiveTab(i)
        return;
      }
    }
    this.setState(oldState => {
      var tabs = [...oldState.tabs, { title: title, data: data, path: path }]
      return { tabs: tabs, activeTabIndex: tabs.length - 1 };
    })
  }


  addTabs(t) {
    this.setState(oldState => {
      var a = [...t]
      return { tabs: a, activeTabIndex: a.length - 1 };
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

  setPath(path) {
    this.setState(oldState => {
      var tabs = oldState.tabs;
      tabs[oldState.activeTabIndex].path = path;
      tabs[oldState.activeTabIndex].title = path.split("\\").pop();
      return { tabs: tabs }
    })
  }

  clearTerminal() {
    this.setState({ terminalMessage: [] })
  }

  toggleTerminalVisibility() {
    this.setState(oldState => { return { terminalIsOpen: !oldState.terminalIsOpen } })
  }

  openTerminal() {
    this.setState({ terminalIsOpen: true })
  }

  setFiles(files) {
    this.setState({ files: files.sort().reverse() })
  }

  render() {
    console.log(this.state)
    let { tabs, activeTabIndex, terminalIsOpen, terminalMessage, cm } = this.state
    let activeTab = tabs[activeTabIndex]
    let menu = getMenus({
      addTabs: this.addTabs,
      activeTab: activeTab,
      append: this.append,
      path: activeTab.path,
      setPath: this.setPath,
      openTerminal: this.openTerminal,
      setFiles: this.setFiles,
      addTab: this.addTab,
      clearTerminal: this.clearTerminal,
    })

    return (
      <div className="app-wrapper">
        <link rel="stylesheet" type="text/css" href={process.env.PUBLIC_URL + '/monakai.css'} />
        <WindowBar
          title={activeTab === undefined ? "" : activeTab.path}
          menu={menu}
          setActiveTab={activeTab}
          tabs={tabs}
          openTerminal={this.openTerminal}
          activeTabIndex={activeTabIndex}
        />
        <div className="pane-wrapper">
          <Explorer files={this.state.files} addTab={this.addTab} />
          <div className="main-pane">
            <Tabs
              tabs={tabs}
              activeTabIndex={activeTabIndex}
              addTab={this.addTab}
              closeTab={this.closeTab}
              setActiveTab={this.setActiveTab}
              compile={() => {
                this.clearTerminal()
                compile({
                  path: activeTab.path, data: activeTab.data, callback: (path) => {
                    this.setPath(path)
                  }, append: this.append, openTerminal: this.openTerminal
                })
              }}
              run={() => {
                this.clearTerminal()
                run(activeTab.path, activeTab.data, (path) => {
                  this.setPath(path)
                }, this.append)
              }}

              compileAndRun={() => {
                this.clearTerminal()
                compileAndRun({
                  path: activeTab.path, data: activeTab.data, callback: (path) => {
                    this.setPath(path)
                  }, append: this.append, openTerminal: this.openTerminal
                })
              }}
            />
            <Editor
              setTabContent={this.setTabContent}
              value={activeTab === undefined ? "" : activeTab.data}
              setLine={(line, ch) => this.setState({
                cm: {
                  line: line,
                  ch: ch
                }
              })} />
            <Terminal
              terminalIsOpen={terminalIsOpen}
              filename={activeTab === undefined ? "" : activeTab.path}
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
