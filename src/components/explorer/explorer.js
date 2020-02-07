import * as React from 'react'
import './explorer.css'

class Explorer extends React.Component {
    render() {
        return (
            <div className="explorer">
                {this.props.files.map(file => <div>file</div>)}
            </div>
        )
    }
}

export default Explorer;