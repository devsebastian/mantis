import * as React from 'react'
import './terminal.css'

function resize(e) {
    e.preventDefault();
    window.addEventListener('mousemove', changeHeight)
    window.addEventListener('mouseup', stopResize)
}

function changeHeight(e) {
    var target = document.getElementsByClassName("terminal-wrapper")[0];
    var height = target.getBoundingClientRect().bottom - e.pageY + 'px';
    target.style.height = height;
}

function stopResize(e) {
    window.removeEventListener('mousemove', changeHeight)
}

class Terminal extends React.Component {

    render() {
        return (
            this.props.terminalIsOpen ?
                <div className="terminal-wrapper" >
                    <div id="resizer" onMouseDown={resize} ></div>
                    <div className="terminal">
                        <div className="terminal__title">COMPILE LOG</div>
                        <div className="terminal__body">
                            {
                                this.props.messages.map(
                                    (m, pos) =>
                                        <div className="terminal__message" key={pos}>
                                            <span className="terminal__message--header">{this.props.filename.split('\\').pop() + "::"}</span>
                                            <span>{m.replace(this.props.filename + ":", "")}</span>
                                        </div>
                                )
                            }
                        </div>
                    </div>
                </div> : <div style={{ display: "none" }}></div>
        )
    }
}



export default Terminal