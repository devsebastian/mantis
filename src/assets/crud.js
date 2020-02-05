import run_script from "../somefile";

const { remote } = window.require('electron')
const app = remote.app;
const dialog = remote.dialog
const WIN = remote.getCurrentWindow()
var fs = window.require('fs');

export function saveAs(data, callback) {
    let options = {
        title: "Save",
        defaultPath: app.getPath('desktop'),
        buttonLabel: "Save",
        filters: [
            { name: 'C++ source files', extensions: ['cpp', 'cc', 'cxx', 'c++', 'cp'] },
            { name: 'C source files', extensions: ['c'] },
            { name: 'Header files', extensions: ['h', 'hpp', 'rh', 'hh'] },
            { name: 'Resource files', extensions: ['rc'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    }

    dialog.showSaveDialog(WIN, options, (filename) => {
        if (filename === undefined) {
            return;
        }
        save(filename, data, callback)
    })
}

export function save(filename, data, callback) {
    fs.writeFile(filename, data, (err) => {
        if (err) {
            console.log("An error ocurred creating the file: " + err.message)
            return
        }
        if (typeof callback === 'function')
            callback(filename);
        console.log("The file has been succesfully saved at " + filename);
    });
}

export function open(filename, write) {
    run_script("start", [filename], null, write);
}

export function compileAndRun(filename, data, callback, write) {
    if (filename === undefined) {
        saveAs(data, (filename) => {
            if (typeof callback === 'function')
                callback(filename)
            run_script("g++", [filename, "-o", filename.replace(".cpp", ".exe")], () => open(filename.replace(".cpp", ".exe")), write)
        })
    } else {
        save(filename, data, (filename) => {
            if (typeof callback === 'function')
                callback(filename)
            run_script("g++", [filename, "-o", filename.replace(".cpp", ".exe")], () => open(filename.replace(".cpp", ".exe")), write)
        })
    }
}

export function run(filename, data, callback, write) {
    if (filename === undefined) {
        saveAs(data, (filename) => {
            if (typeof callback === 'function')
                callback(filename)
            run_script("g++", [filename, "-o", filename.replace(".cpp", ".exe")], () => open(filename.replace(".cpp", ".exe")), write)
        })
    } else {
        open(filename.replace(".cpp", ".exe"))
    }
}

export function compile(filename, data, callback, write) {
    if (filename === undefined) {
        saveAs(data, (filename) => {
            if (typeof callback === 'function')
                callback(filename)
            run_script("g++", [filename, "-o", filename.replace(".cpp", ".exe")], null, write)
        })
    } else {
        save(filename, data, (filename) => {
            if (typeof callback === 'function')
                callback(filename)
            run_script("g++", [filename, "-o", filename.replace(".cpp", ".exe")], null, write)
        })
    }
}