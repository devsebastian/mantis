import React from 'react';
import './App.css';
import Editor from './components/editor/editor'
import WindowBar from './components/window-bar/window-bar'
import StatusBar from './status-bar/status-bar';

class App extends React.Component {


  constructor() {
    super();
    this.state = {
      activeTabIndex: 0,
      tabs: [
        { title: "Dev", data: "class Dev{\n\tint num=12\n}" },
        { title: "Joe Sebastian", data: "class Joe Sebastian{\n\tint num=12\n}" },
        { title: "Code" }]
    }

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
      return {tabs: tabs}
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
        <Editor setTabContent={this.setTabContent} data={this.state.tabs[this.state.activeTabIndex].data} />
        <StatusBar />
      </div>
    );
  }
}

export default App;
