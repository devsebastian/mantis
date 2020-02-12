import * as React from 'react'
import Tab from './tab/tab'
import './tabs.css'
import { compile } from '../../assets/crud'

class Tabs extends React.Component {

    render() {
        return (
            <div className="tabs-wrapper">
                <div className="tabs-container">
                    {this.props.tabs.map((tab, pos) => <Tab
                        closeTab={this.props.closeTab}
                        title={tab.title}
                        selected={pos !== this.props.activeTabIndex ? false : true}
                        onClickListener={() => this.props.setActiveTab(pos)}
                        key={pos}
                        pos={pos} />)}
                    <div className="tabs__spacer"></div>
                </div>
                <abbr title="compile" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" onClick={this.props.compile}>
                        <path fill="var(--primary-light)" d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
                    </svg>
                </abbr >
                <abbr title="run" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" onClick={this.props.run}>
                        <path fill="var(--primary-light)" d="M8.5,8.64L13.77,12L8.5,15.36V8.64M6.5,5V19L17.5,12" />
                    </svg>
                </abbr>
                <abbr title="build and run" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" onClick={this.props.compileAndRun}>
                        <path fill="var(--primary-light)" d="M13,2.05V4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03V2.05M5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37L5.67,19.74M7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74M5.69,7.1L4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1M4.06,13H2.06C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13M10,16.5L16,12L10,7.5V16.5Z" />
                    </svg>
                </abbr>
                <abbr title="settings" >
                    <svg width="24px" height="24px" viewBox="0 0 24 24" >
                        <path fill="var(--primary-light)" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                    </svg>
                </abbr>

            </div >
        )
    }
}

export default Tabs