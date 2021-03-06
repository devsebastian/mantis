import { open, run, compileAndRun, save, saveAs, compile, openDirectory } from './crud'

const electron = window.require('electron').remote;
const app = electron.app;

// globalShortcut.register('Ctrl+Shift+S', saveAsMenu)
// globalShortcut.register('Ctrl+S', saveMenu)
import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/global-bind/mousetrap-global-bind'


function saveMenu(path, data, setPath) {
    save(path, data, setPath);
}

function saveAsMenu(data, setPath) {
    saveAs(data, setPath)
}

export function getMenus(options) {
    Mousetrap.bindGlobal('ctrl+s', (e) => {
        options.path === undefined ? saveAsMenu(options.activeTab.data, options.setPath) : saveMenu(options.activeTab.path, options.activeTab.data, options.setPath);
    });

    Mousetrap.bindGlobal('ctrl+shift+s', (e) => {
        saveAsMenu(options.data, options.setPath);
    });
    return [
        menu(
            "File",
            [
                group([
                    menuItem("new", "New", "Ctrl+N", () => options.addTab('Untitled')),
                    menuItem("openFile", "Open File", "Ctrl+O", () => open(options.addTab)),
                    menuItem("openDirectory", "Open Directory", "Ctrl+K Ctrl+O", () => openDirectory(options.setFiles)),
                ]),
                group([
                    menuItem("saveas", "Save As", "Ctrl+Shift+S", () => saveAsMenu(options.activeTab.data, options.setPath)),
                    menuItem("save", "Save", "Ctrl+S", () => saveMenu(options.path, options.activeTab.data, options.setPath), options.path === undefined ? true : false),
                ]),
                group([
                    menuItem("preferences", "Preferences", "Ctrl+,", () => { }),
                ]),
                group([
                    menuItem("exit", "Exit", null, () => { app.quit() }),
                ])
            ]
        ),
        menu(
            "Edit",
            [
                group([
                    menuItem("undo", "Undo", "Ctrl+Z", () => options.addTab('Untitled')),
                    menuItem("redo", "Redo", "Ctrl+Y", () => open(options.addTab)),
                ]),
                group([
                    menuItem("cut", "Cut", "Ctrl+X", () => { saveAs(options.activeTab.data, options.setPath) }),
                    menuItem("copy", "Copy", "Ctrl+C", () => { save(options.path, options.activeTab.data, options.setPath) }),
                    menuItem("paste", "Paste", "Ctrl+V", () => { save(options.path, options.activeTab.data, options.setPath) }),
                ]),
                group([
                    menuItem("find", "Find", "Ctrl+F", () => { }),
                    menuItem("replace", "Replace", "Ctrl+R", () => { }),
                ]),
                group([
                    menuItem("autoIndent", "Auto Indent", "Shift+Tab", () => { }),
                ])
            ]
        ),
        menu(
            "Selection",
            [
                group([
                    menuItem("selectAll", "Select All", "Ctrl+A", null),
                    menuItem("expandSelection", "Expand Selection", null, null),
                    menuItem("shrinkSelection", "Shrink Selection", null, null),
                ]),
            ]
        ),
        menu(
            "Execute",
            [
                group([
                    menuItem("compile", "Compile", "F9", () => {
                        options.clearTerminal()
                        compile({
                            path: options.activeTab.path,
                            data: options.activeTab.data,
                            callback: (path) => {
                                options.setPath(path)
                            },
                            append: options.append,
                            openTerminal: options.openTerminal
                        })
                        // compile(options.activeTab.path, options.activeTab.data, (path) => {
                        //     options.setPath(path)
                        // }, options.append)
                    }),
                    menuItem("run", "Run", "F10", () => {
                        options.clearTerminal()
                        run(options.activeTab.path, options.activeTab.data, (path) => {
                            options.setPath(path)
                        }, options.append)
                    }),
                    menuItem("compileAndRun", "Compile and Run", "F11", () => {
                        options.clearTerminal()
                        compileAndRun({
                            path: options.activeTab.path, data: options.activeTab.data, callback: (path) => {
                                options.setPath(path)
                            }, append: options.append, openTerminal: options.openTerminal
                        })
                    })
                ]),
                group([
                    menuItem("rebuildAll", "Rebuild All", "F12", null),
                    menuItem("syntaxCheck", "Syntax Check", "Ctrl+X", null),
                ]),
                group([
                    menuItem("clean", "Clean", null, null),
                    menuItem("paste", "Paste", null, null)
                ])
            ]
        ),
        menu(
            "Help",
            [
                group([
                    menuItem("documnetation", "Documentation", null, null),
                    menuItem("releaseNotes", "Release Notes", null, null),
                ]),
                group([
                    menuItem("about", "About", null, null),
                ]),
                group([
                    menuItem("checkForUpdates", "Find", null, null),
                ]),
            ]
        )
    ]
}

function menu(title, groups) {
    return {
        title: title,
        items: groups
    }
}

function menuItem(id, title, shortcut, action, disabled) {
    return {
        id: id,
        title: title,
        shortcut: shortcut,
        action: action,
        disabled: disabled
    }
}

function group(items) {
    return items
}
