import * as React from 'react'
import './explorer.css'
import FileIcon from '../../assets/explorer-icons';

const fs = window.require('fs')
function resize(e) {
    e.preventDefault();
    window.addEventListener('mousemove', changeHeight)
    window.addEventListener('mouseup', stopResize)
}

function changeHeight(e) {
    var target = document.getElementsByClassName("explorer-wrapper")[0];
    var width = e.pageX + target.getBoundingClientRect().left + 'px';
    target.style.width = width;
}

function stopResize(e) {
    window.removeEventListener('mousemove', changeHeight)
}


function CaretSymbol({ size, folderIsClosed }) {
    if (folderIsClosed) {
        return <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size}>
            <path fill="var(--text-secondary)" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            <path d="M0 0h24v24H0V0z" fill="none" />
        </svg>
    } else {
        return <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size}>
            <path fill="var(--text-secondary)" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            <path d="M0 0h24v24H0V0z" fill="none" />
        </svg>
    }
}


class ExplorerItems extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            positions: []
        }
    }

    render() {
        return (
            <div className="explorer-items" >
                {this.props.path.map((file, pos) => {
                    if (typeof file === 'object') {
                        return (
                            <div key={pos} >
                                <ExplorerTab padding={this.props.padding} type={"folder"} showCaret={true} isClosed={!this.state.positions.includes(pos)} title={file.title} clickListener={() => {
                                    this.setState(state => {
                                        var positions = state.positions;
                                        if (positions.includes(pos)) {
                                            positions.pop(pos)
                                        } else {
                                            positions.push(pos)
                                        }
                                        return { positions: positions }
                                    })
                                }} />
                                <div className="explorer__group">{this.state.positions.includes(pos) ?
                                    <ExplorerItems padding={this.props.padding == undefined ? 20 : this.props.padding + 8} addTab={this.props.addTab} path={file.files} /> :
                                    <div></div>}
                                </div>
                            </div>)
                    } else {
                        return <ExplorerTab padding={this.props.padding} key={pos} type={file.split(".").pop()} title={file.split("\\").pop()} clickListener={() => this.props.addTab(file.split("\\").pop(), fs.readFileSync(file.toString()).toString(), file.toString())} />
                    }
                })}
            </div >)
    }
}

class Explorer extends React.Component {
    render() {
        return (
            <div className="explorer-wrapper">
                <div className="explorer">
                    <div className="explorer-search-bar">
                        <input placeholder="Search" />
                    </div>
                    <div className="explorer-scroller">
                        <ExplorerItems path={this.props.files} addTab={this.props.addTab} />
                    </div>
                </div>
                <div className="explorer-resizer" onMouseDown={resize} ></div>
            </div>
        )
    }
}

function ExplorerTab({ title, type, clickListener, showCaret, isClosed, padding }) {
    return (
        <div className="explorer-item" onClick={clickListener} style={{ paddingLeft: padding }}>
            <div className="explorer-item-caret-gutter">
                {showCaret ? <CaretSymbol size="16" folderIsClosed={isClosed} /> : <div></div>}
            </div>
            <FileIcon cname="explorer-item__icon" size="16" type={type} />
            <div className="explorer-item__title">{title}</div>
        </div>
    )
}

export default Explorer;