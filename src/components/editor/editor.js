import * as React from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'
import './editor.css'
import 'codemirror/addon/edit/matchbrackets'

class Editor extends React.Component {


    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
            mode: "text/x-c++src",
            indentWithTabs: true,
            lineNumbers: true,
            indentUnit: 4,
            matchBrackets: true,
        })


    }

    
    render() {
        if (this.editor !== undefined) {
            this.editor.setValue(this.props.data === undefined ? "" : this.props.data)
        }
        return (
            <div className="editor-holder">
                <input id="editor" />
            </div>
        )
    }

    componentWillUnmount() {
        this.editor.toTextArea();
    }
}

export default Editor;