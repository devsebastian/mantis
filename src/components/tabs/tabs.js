import * as React from 'react'
import Tab from './tab/tab'
import './tabs.css'

class Tabs extends React.Component {


    componentDidMount() {
    }

    render() {
        return (
            <div className="tabs">
                {this.props.tabs.map((tab, pos) => <Tab
                    closeTab={this.props.closeTab}
                    title={tab.title}
                    selected={pos !== this.props.activeTabIndex ? false : true}
                    onClickListener={() => this.props.setActiveTab(pos)}
                    key={pos}
                    pos={pos} />)}
            </div>
        )
    }
}

export default Tabs