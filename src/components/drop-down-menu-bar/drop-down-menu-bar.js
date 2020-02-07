import * as React from 'react'
import './drop-down-menu-bar.css'
import DropDownMenu from './drop-down-menu/drop-down-menu'

class DropDownMenuBar extends React.Component {
    constructor() {
        super()
        this.state = {
            activeIndex: -1,
            menuActivated: false
        }
        this.setActiveIndex = this.setActiveIndex.bind(this)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setMenuActivity = this.setMenuActivity.bind(this)
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    /**
  * Set the wrapper ref
  */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.state.menuActivated && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ activeIndex: -1 , menuActivated: false})
        }
    }

    setMenuActivity(enabled){
        this.setState({menuActivated: enabled})
    }

    setActiveIndex(index) {
        this.setState({ activeIndex: index })
    }
    
    render() {
        return (
            <div className="dd-menu-bar-wrapper" ref={this.setWrapperRef}>
                {this.props.menu.map((menu, pos) =>
                    <DropDownMenu
                        pos={pos}
                        key={pos}
                        menuActivated={this.state.menuActivated}
                        setMenuActivity={this.setMenuActivity}
                        activeIndex={this.state.activeIndex}
                        setActiveIndex={this.setActiveIndex}
                        title={menu.title}
                        items={menu.items} />)}
            </div>
        )
    }
}

export default DropDownMenuBar;