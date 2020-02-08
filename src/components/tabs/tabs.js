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
                <abbr title="split screen" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path fill="var(--primary-light)" d="M4 15h6c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h6c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-8h6c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 6c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm11-1h6c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1z" />
                    </svg>
                </abbr>
                <abbr title="compile" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" onClick={this.props.compile}>
                        <path fill="var(--primary-light)" d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
                    </svg>
                </abbr >
                <abbr title="run" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" onClick={this.props.run}>
                        <path fill="var(--primary-light)" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
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