import * as React from 'react'
import './window-bar.css'
import minimise from '../../assets/minimise.svg'
import maximise from '../../assets/maximise.svg'
import close from '../../assets/close.svg'
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
            <DropDownMenuBar menu={props.menu} />


            <div className="window-bar-spacer"></div>
            <img className="window-bar-icon window-bar-icon--normal" onClick={minimizeWindow} src={minimise} />
            <img className="window-bar-icon window-bar-icon--normal" onClick={maximizeWindow} src={maximise} />
            <img className="window-bar-icon window-bar-icon--close" onClick={closeWindow} src={close} />

        </div>
    )
}

export default WindowBar;