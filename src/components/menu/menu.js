import * as React from 'react'
import './menu.css'


/*
[
...{
    title: string,
    action: callback
}
]

*/
class Menu extends React.Component {

    render() {
        return (
            <div className="menu">
                {this.props.menu.map((item, pos) => <MenuItem key={pos} title={item.title} action={item.action} />)}
            </div>
        )
    }
}

function MenuItem(props) {
    return (
        <div className="menu-item" onClick={props.action}>
            {props.title}
        </div>
    )
}
export default Menu