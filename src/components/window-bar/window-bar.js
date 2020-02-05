import * as React from 'react'
import './window-bar.css'
import minimise from '../../assets/minimise.svg'
import maximise from '../../assets/maximise.svg'
import close from '../../assets/close.svg'
import Menu from '../menu/menu'
import DropDownMenu from '../drop-down-menu-bar/drop-down-menu/drop-down-menu'
import DropDownMenuBar from '../drop-down-menu-bar/drop-down-menu-bar'
const { remote } = window.require('electron')

function closeWindow() {
    var window = remote.BrowserWindow.getFocusedWindow();
    window.close();
}

function minimizeWindow() {
    var window = remote.BrowserWindow.getFocusedWindow();
    window.minimize();
}

function maximizeWindow() {
    var window = remote.BrowserWindow.getFocusedWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
}

function WindowBar(props) {
    return (
        <div className="window-bar">
            {/* <Menu menu={props.menu}  /> */}
            <DropDownMenuBar menu={[
                {
                    title: "File",
                    items: [
                        { id: 1, title: "New", shortcut: "Ctrl+N", action: () => { console.log('new') } },
                        { id: 2, title: "Open", action: () => { console.log('open') } },
                        { id: 3, title: "Exit", action: () => { console.log('exit') } },
                    ]
                },
                {
                    title: "Edit",
                    items: [
                        { id: 1, title: "New", action: () => { console.log('new') } },
                        { id: 2, title: "Open", action: () => { console.log('open') } },
                        { id: 3, title: "Exit", action: () => { console.log('exit') } },
                    ]
                }
            ]} />


            <div className="window-bar-spacer"></div>
            <img className="window-bar-icon window-bar-icon--normal" onClick={minimizeWindow} src={minimise} />
            <img className="window-bar-icon window-bar-icon--normal" onClick={maximizeWindow} src={maximise} />
            <img className="window-bar-icon window-bar-icon--close" onClick={closeWindow} src={close} />

        </div>
    )
}

export default WindowBar;