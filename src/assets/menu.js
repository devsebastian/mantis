import { open, run, compileAndRun, saveAs, compile } from './crud'
function getMenu(options) {
    return [
        {
            title: "File",
            items: [
                [
                    { id: "new", title: "New", shortcut: "Ctrl+N", action: () => options.addTab('Untitled') },
                    { id: "open", title: "Open", shortcut: "Ctrl+O", action: () => open(options.addTab) },
                    { id: "exit", title: "Exit", action: () => { } },
                ],
                [
                    {
                        id: "saveas", title: "Save As", shortcut: "Ctrl+Shift+S", action: () => {
                            saveAs(options.activeTab.data, (filename) => {
                                this.setFilename(filename)
                            })
                        }
                    }, {
                        id: "save", title: "Save", shortcut: "Ctrl+S", action: () => {
                            saveAs(options.activeTab.data, (filename) => {
                                this.setFilename(filename)
                            })
                        }
                    }
                ], [
                    { id: "preferences", title: "Preferences", action: () => { } }
                ]
            ]
        },
        {
            title: "Edit",
            items: [
                [{ id: "undo", title: "Undo", shortcut: "Ctrl+Z", action: () => { } },
                { id: "redo", title: "Redo", shortcut: "Ctrl+Y", action: () => { } },
                ],
                [{ id: "cut", title: "Cut", shortcut: "Ctrl+X", action: () => { } },
                { id: "copy", title: "Copy", shortcut: "Ctrl+C", action: () => { } },
                { id: "paste", title: "Paste", shortcut: "Ctrl+V", action: () => { } },
                ]
            ]
        }, {
            title: "Selection",
            items: [
                [{ id: "selectall", title: "Select All", shortcut: "Ctrl+A", action: () => { } },
                { id: "expandselection", title: "Expand Selection", action: () => { } },
                { id: "shrinkselection", title: "Shrink Selection", action: () => { } },
                ],
                [{ id: "cut", title: "Cut", shortcut: "Ctrl+X", action: () => { } },
                { id: "copy", title: "Copy", shortcut: "Ctrl+C", action: () => { } },
                { id: "paste", title: "Paste", shortcut: "Ctrl+V", action: () => { } },
                ]
            ]
        },
        {
            title: "Execute",
            items: [
                [
                    {
                        id: "compile", title: "Compile", shortcut: "F9", action: () => {
                            options.clearTerminal()
                            compile(options.activeTab.filename, options.activeTab.data, (filename) => {
                                options.setFilename(filename)
                            }, options.append)
                        }
                    },
                    {
                        id: "run", title: "Run", shortcut: "F10", action: () => {
                            options.clearTerminal()
                            run(options.activeTab.filename, options.activeTab.data, (filename) => {
                                options.setFilename(filename)
                            }, options.append)
                        },
                    },
                    {
                        id: "compileandrun", title: "Compile and Run", shortcut: "F11", action: () => {
                            options.clearTerminal()
                            compileAndRun(options.activeTab.filename, options.activeTab.data, (filename) => {
                                options.setFilename(filename)
                            }, options.append)
                        }
                    },
                    { id: "rebuildall", title: "Rebuild All", shortcut: "F12", action: () => { console.log('new') } },
                ],
                [
                    { id: "syntaxcheck", title: "Syntax Check", shortcut: "Ctrl+X", action: () => { console.log('new') } },
                ],
                [
                    { id: "clean", title: "Clean", shortcut: "Ctrl+C", action: () => { console.log('new') } },
                    { id: "paste", title: "Paste", shortcut: "Ctrl+V", action: () => { console.log('new') } },
                ]
            ]
        },{
            title: "Help",
            items: [
                [
                    {id: "documentation", title: "Documentation", action: ()=>{}},
                    {id: "releasenotes", title: "Release Notes", action: ()=>{}}
                ],[
                    {id: "about", title: "About", action: ()=>{}}
                ],[
                    {id: "check for updates", title: "Check for Updates", action: ()=>{}}
                ]
            ]
        }
    ]
}

export default getMenu;