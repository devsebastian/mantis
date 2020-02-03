import * as React from 'react'
import './tab.css'

class Tab extends React.Component {

    render() {
        const { title, selected } = this.props
        return (
            <div className={selected ? "tab tab--selected" : "tab"} >
                <div className="tab-title"
                    onClick={this.props.onClickListener} >
                    {title}
                </div>
                <div className="tab-close-btn"
                    onClick={() => this.props.closeTab(this.props.pos)}>✕</div>
            </div>
        )
    }
}

export default Tab