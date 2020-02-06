import * as React from 'react'

import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import './editor.css'

class Editor extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <CodeMirror
                onBeforeChange={(editor, data, value) => { this.props.setTabContent(value) }}
                value={this.props.value}
                options={{
                    lineNumbers: true,
                    mode: "text/x-c++src",
                    indentWithTabs: true,
                    indentUnit: 4,
                    matchBrackets: true,
                    foldGutter: true,
                    lint: true,
                    autoCloseBrackets: true
                }}

                editorDidMount={e => {
                    e.on('cursorActivity', (e) => {
                        const cursor = e.getCursor();
                        this.props.setLine(cursor.line + 1, cursor.ch + 1)
                    })

                }}
            />
        )
    }
}



export default Editor