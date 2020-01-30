import * as React from 'react'
import './window-bar.css'
import Tabs from '../tabs/tabs'

function WindowBar(props) {
    return (
        <div className="window-bar">
            <Tabs tabs={props.tabs}
                activeTabIndex={props.activeTabIndex}
                addTab={props.addTab}
                setActiveTab={props.setActiveTab} />
        </div>
    )
}

export default WindowBar;