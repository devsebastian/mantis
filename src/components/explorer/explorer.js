import * as React from 'react'
import './explorer.css'
import FileIcon from '../../assets/icons-generator';

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


class DisplayFiles extends React.Component {

    constructor() {
        super()
        this.state = {
            path: []
        }
    }

    componentDidUpdate(){
        if(this.state.path !== this.props.path){
            this.setState({path: this.props.path})
            return false;
        }
    }

    render() {
        console.log(this.state)
        const { path } = this.state
        return (
            <div className="explorer-items" >
                {path.map((path, pos) => {
                    if (typeof path === 'object') {
                        if (path[pos] !== undefined && path[pos].isOpen) {
                            return (
                                <div className="explorer-item" key={pos} onClick={() => {
                                    this.setState(state => {
                                        var path = [...state.path]
                                        path[pos].isOpen = false
                                        return { path: path }
                                    })
                                }} >
                                    <div className="explorer-item-caret-gutter"><CaretSymbol folderIsClosed={true} size="16" /></div>
                                    <FileIcon cname="explorer-item__icon" size="16" type="folder" />
                                    <div className="explorer-item__title">{path.title}</div>
                                    {path[pos].isOpen ? <DisplayFiles path={path.files} /> : <div></div>}
                                </div>
                            )
                        } else {
                            return (
                                <div className="explorer-item" key={pos}  onClick={() => {
                                    this.setState(state => {
                                        var path = [...state.path]
                                        path[pos].isOpen = true
                                        return { path: path }
                                    })
                                }}>
                                    <div className="explorer-item-caret-gutter"><CaretSymbol folderIsClosed={true} size="16" /></div>
                                    <FileIcon cname="explorer-item__icon" size="16" type="folder" />
                                    <div className="explorer-item__title">{path.title}</div>
                                </div>
                            )
                        }

                    } else {
                        return (
                            <div className="explorer-item" key={pos} onClick={() => this.props.addTab(path.split("\\").pop(), fs.readFileSync(path.toString()).toString(), path.toString)} >
                                <div className="explorer-item-caret-gutter"></div>
                                <FileIcon cname="explorer-item__icon" size="16" type={path.split(".").pop()} />
                                <div className="explorer-item__title">{path.split("\\").pop()}</div>
                            </div>
                        )
                    }
                })}
            </div>)
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
                    <DisplayFiles path={this.props.files} />
                </div>
                <div className="explorer-resizer" onMouseDown={resize} ></div>
            </div>
        )
    }
}

export default Explorer;