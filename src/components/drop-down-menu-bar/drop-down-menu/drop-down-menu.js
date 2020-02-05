import * as React from 'react'
import './drop-down-menu.css'

class DropDownMenu extends React.Component {
    constructor() {
        super()
        this.toggleMenu = this.toggleMenu.bind(this)
    }


    toggleMenu(e) {
        if (this.props.activeIndex === this.props.pos) {
            this.props.setMenuActivity(false)
            this.props.setActiveIndex(-1)
        } else {
            this.props.setMenuActivity(true)
            this.props.setActiveIndex(this.props.pos)
        }
    }

    onClickListener(action){
        action();
        this.toggleMenu();
    }


    render() {
        return (
            <div className="dd-wrapper">
                <div className={this.props.activeIndex === this.props.pos ? "dd-header dd-header--activated" :"dd-header"} onClick={this.toggleMenu} onMouseOver={this.props.menuActivated ? this.toggleMenu : ""}>{this.props.title}</div>
                {this.props.activeIndex === this.props.pos ?
                    <div className="dd-list-items-wrapper">
                        {this.props.items.map(item =>
                            <div className="dd-list-item" key={item.id} onClick={() => this.onClickListener(item.action)}><div>{item.title}</div><div>{item.shortcut}</div></div>)}
                    </div>
                    : <div></div>}
            </div>

        )
    }
}

export default DropDownMenu;