import * as React from 'react'
import './status-bar.css'

class StatusBar extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="status-bar">
                <b>MANTIS</b> | CODE
                <div style={{ display: "inline-block", paddingLeft: 12 }}>{"Ln " + this.props.options.line + ", Col " + this.props.options.ch}</div>
            </div>
        )
    }
}

export default StatusBar