import * as React from 'react'
import './tab.css'

class Tab extends React.Component {


    componentDidMount() {
    }

    render() {
        const {title, selected} = this.props
        return (
            <div className={selected ? "tab tab--selected" : "tab"} onClick={this.props.onClickListener}>
                {title}
            </div>
        )
    }
}

export default Tab