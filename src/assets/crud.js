import run_script from "../somefile";

const { remote } = window.require('electron')
const app = remote.app;
const dialog = remote.dialog
const WIN = remote.getCurrentWindow()
var fs = window.require('fs');

const options = {
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

export function saveAs(data, callback) {
    dialog.showSaveDialog(WIN, options).then((result) => {
        if (result.filePath === undefined) {
            return;
        }
        save(result.filePath, data, callback)
    }).catch(err => alert('there was an error saving the file.'))
}

export function open(callback) {
    dialog.showOpenDialog(WIN, options).then((result) => {
        if (result.filePaths === undefined) {
            return
        };
        fs.readFile(result.filePaths[0], (err, data) => {
            if (err) {
                console.log("An error ocurred creating the file: " + err.message)
                return
            }
            if (typeof callback === 'function') {
                var t = result.filePaths[0].split("\\");
                t = t[t.length -1]
                callback(t, data.toString(), result.filePaths[0]);
            }
        });
    }).catch(err => alert('there was an error opening the file.\n\n' + err))
}

export function save(filename, data, callback) {
    console.log('save called')
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

export function execute(filename, write) {
    run_script("start", [filename], null, write);
}

export function compileAndRun(filename, data, callback, write) {
    if (filename === undefined) {
        saveAs(data, (filename) => {
            if (typeof callback === 'function')
                callback(filename)
            run_script("g++", [filename, "-o", filename.replace(".cpp", ".exe")], () => execute(filename.replace(".cpp", ".exe")), write)
        })
    } else {
        save(filename, data, (filename) => {
            if (typeof callback === 'function')
                callback(filename)
            run_script("g++", [filename, "-o", filename.replace(".cpp", ".exe")], () => execute(filename.replace(".cpp", ".exe")), write)
        })
    }
}

export function run(filename, data, callback, write) {
    if (filename === undefined) {
        saveAs(data, (filename) => {
            if (typeof callback === 'function')
                callback(filename)
            run_script("g++", [filename, "-o", filename.replace(".cpp", ".exe")], () => execute(filename.replace(".cpp", ".exe")), write)
        })
    } else {
        execute(filename.replace(".cpp", ".exe"))
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