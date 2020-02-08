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


class Explorer extends React.Component {

    render() {
        return (
            <div className="explorer-wrapper">
                <div className="explorer">
                    <div className="explorer-search-bar">
                        <input placeholder="Search" />
                    </div>
                    <div className="explorer-items" >
                        {this.props.files.map((file, pos) =>
                            <div className="explorer-item" key={pos} onClick={() => this.props.addTab(file.split("\\").pop(), fs.readFileSync(file.toString()).toString(), file.toString)} >
                                {/* <FileIcon size="18" type={file.split(".").pop()} /> */}
                                <FileIcon cname="explorer-item__icon" size="16" type={file.split(".").pop()} />
                                <div className="explorer-item__title">{file.split("\\").pop()}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="explorer-resizer" onMouseDown={resize} ></div>

            </div>
        )
    }
}

export default Explorer;