import * as React from 'react'
import './terminal.css'

function resize(e) {
    e.preventDefault();
    window.addEventListener('mousemove', changeHeight)
    window.addEventListener('mouseup', stopResize)
}

function changeHeight(e) {
    var target = document.getElementsByClassName("terminal")[0];
    var height = target.getBoundingClientRect().bottom - e.pageY + 'px';
    target.style.height = height;
}

function stopResize(e) {
    window.removeEventListener('mousemove', changeHeight)
}

class Terminal extends React.Component {

    render() {
        return (
            this.props.messages.length == 0 ? <div></div> :
            <div className="terminal">
                <div id="resizer" onMouseDown={resize} >
                </div>
                <div className="resizable" style={{ height: 200 }}>
                    {this.props.messages.map((m, pos) => <div key={pos}>{m}</div>)}
                </div>
            </div>
        )
    }
}


export default Terminal