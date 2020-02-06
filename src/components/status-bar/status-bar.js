import * as React from 'react'
import './status-bar.css'

class StatusBar extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="status-bar">
                <div className="status-bar__block"> <b>MANTIS</b> | CODE</div>
                <div className="status-bar__block">
                    {"Ln " + this.props.options.line + ", Col " + this.props.options.ch}
                </div>
                <div className="status-bar__block" onClick={this.props.toggleTerminalVisibility}>
                    TERMINAL
                </div>
                <div className="status-bar__block" >
                    Spaces: 4
                </div>
            </div>
        )
    }
}

export default StatusBar