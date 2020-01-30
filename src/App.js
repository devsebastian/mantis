import React from 'react';
import './App.css';
import WindowBar from './components/window-bar/window-bar'
import StatusBar from './components/status-bar/status-bar';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'
import 'codemirror/addon/edit/matchbrackets'
import './editor.css'
import run_script from './somefile';
import Tabs from './components/tabs/tabs';
var child_process = window.require('child_process');

const { dialog } = window.require('electron').remote
const { app, globalShortcut } = window.require('electron').remote
var fs = window.require('fs'); // Load the File System to execute our common tasks (CRUD)
class App extends React.Component {


  constructor() {
    super();
    this.state = {
      activeTabIndex: 0,
      tabs: [
        { title: "Codeforces_69A", data: "class Dev{\n\tint num=12\n}", url: "" },
        { title: "Dev Sebastian", data: "class Joe Sebastian{\n\tint num=12\n}" },
        { title: "HackerEarth_1A" },
        { title: "CodeChef_215B" },
        { title: "Codeforces_256B" }]
    }

    this.editor = null
    // child_process.exec("start cmd /K c:");
    // run_script("g++ dev.cpp", ["/A /B /C"], null);

    globalShortcut.register('Ctrl+w', () => {
      this.setState(oldState => {
        var tabs = oldState.tabs
        tabs.splice([oldState.activeTabIndex], 1);
        return { tabs: tabs }
      })
    })

    globalShortcut.register('Shift+s', () => {
      const options = {
        defaultPath: app.getPath('documents') + '/' + this.state.tabs[this.state.activeTabIndex].title + '.cpp',
      }

      // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
      dialog.showSaveDialog((fileName) => {
        if (fileName === undefined) {
          console.log("You didn't save the file");
          return;
        }

        // fileName is a string that contains the path and filename created in the save file dialog.  
        fs.writeFile(fileName, this.state.tabs[this.state.activeTabIndex].data, (err) => {
          if (err) {
            alert("An error ocurred creating the file " + err.message)
          }
          alert("The file has been succesfully saved");
          this.setState(oldState => {
            var tabs = oldState.tabs;
            tabs[this.state.activeTabIndex].url = fileName;
            return { tabs: tabs }
          })
        });
      });

    })
    this.setActiveTab = this.setActiveTab.bind(this)
    this.addTab = this.addTab.bind(this)
    this.setTabContent = this.setTabContent.bind(this)

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

  render() {
    return (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <WindowBar setActiveTab={this.setActiveTab} addTab={this.addTab} tabs={this.state.tabs} activeTabIndex={this.state.activeTabIndex} />
        <Tabs tabs={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          addTab={this.addTab}
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
        <StatusBar />
      </div>
    );
  }
}

export default App;
