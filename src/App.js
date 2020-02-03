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
import Terminal from './components/terminal/terminal';
var child_process = window.require('child_process');
var spawn = child_process.spawn;
var child = child_process.execFile;
var WIN = window.require('electron').remote.getCurrentWindow()

const { dialog } = window.require('electron').remote
const { app, globalShortcut } = window.require('electron').remote
var fs = window.require('fs'); // Load the File System to execute our common tasks (CRUD)


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

    globalShortcut.register('Ctrl+r', () => {
      this.run();
    })

    globalShortcut.register('Shift+s', () => {
      this.save();

    })
    this.setActiveTab = this.setActiveTab.bind(this)
    this.addTab = this.addTab.bind(this)
    this.setTabContent = this.setTabContent.bind(this)

    this.save = this.save.bind(this)
    this.run = this.run.bind(this)
    this.open = this.open.bind(this)

    this.write = this.write.bind(this)
    this.append = this.append.bind(this)

  }

  save() {
    // const options = {
    //   defaultPath: app.getPath('documents') + '/' + this.state.tabs[this.state.activeTabIndex].title + '.cpp',
    // }

    // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
    // dialog.showSaveDialog((fileName) => {
    //   if (fileName === undefined) {
    //     this.append("You didn't save the file");
    //     return;
    //   }

    //   // fileName is a string that contains the path and filename created in the save file dialog.  
    //   fs.writeFile(fileName, this.state.tabs[this.state.activeTabIndex].data, (err) => {
    //     if (err) {
    //       this.append("An error ocurred creating the file: " + err.message)
    //     }
    //     this.append("The file has been succesfully saved");
    //     this.setState(oldState => {
    //       var tabs = oldState.tabs;
    //       tabs[this.state.activeTabIndex].filename = fileName;
    //       return { tabs: tabs }
    //     })
    //   });
    // });

    let options = {
      title: "Save",
      defaultPath: app.getPath('desktop'),
      buttonLabel: "Save",
      filters: [
        { name: 'C++ source files', extensions: ['cpp', 'cc', 'cxx', 'c++', 'cp'] },
        { name: 'C source files', extensions: ['c'] },
        { name: 'Header files', extensions: ['h', 'hpp', 'rh', 'hh'] },
        { name: 'Resource files', extensions: ['rc'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    }

    dialog.showSaveDialog(WIN, options, (filename) => {
      if (filename === undefined) {
        return;
      }

      fs.writeFile(filename, this.state.tabs[this.state.activeTabIndex].data, (err) => {
        if (err) {
          this.append("An error ocurred creating the file: " + err.message)
        }
        this.append("The file has been succesfully saved at " + filename);
        this.setState(oldState => {
          var tabs = oldState.tabs;
          tabs[this.state.activeTabIndex].filename = filename;
          return { tabs: tabs }
        })
      });
    })
  }

  open() {
    var executablePath = this.state.tabs[this.state.activeTabIndex].filename.replace(".cpp", ".exe");
    run_script("start", [executablePath], null);
  }

  run() {
    // child_process.exec("start cmd /K c:");
    run_script("g++", [this.state.tabs[this.state.activeTabIndex].filename, "-o", this.state.tabs[this.state.activeTabIndex].filename.replace(".cpp", ".exe")], this.open, this.append);
    // console.log(this.state.tabs[this.state.activeTabIndex].filename);

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

  render() {
    return (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <WindowBar
          setActiveTab={this.setActiveTab}
          addTab={this.addTab}
          tabs={this.state.tabs}
          activeTabIndex={this.state.activeTabIndex}
          menu={[
            {
              title: "Save",
              action: this.save
            }, {
              title: "Compile",
              action: this.run
            }, {
              title: "Run",
              action: this.open
            }
          ]} />
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
        <Terminal messages={this.state.terminalMessage} />
        <StatusBar />
      </div>
    );
  }
}

export default App;
