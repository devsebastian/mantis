import * as React from 'react'
import './terminal.css'


class Terminal extends React.Component {
    render() {
        return (
            <div className="terminal">
                {this.props.messages.map((m, pos) => <div key={pos}>{m}</div>)}
            </div>
        )
    }
}
export default Terminal