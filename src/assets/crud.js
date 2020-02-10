import run_script from "../run-script";

const { shell } = window.require('electron')

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
    }).catch(err => console.log('there was an error saving the file: ' + err))
}

export function open(callback) {
    const options = {
        title: "Open",
        properties: ['multiSelections'],
        defaultPath: app.getPath('desktop'),
        buttonLabel: "Open",
        filters: [
            { name: 'C++ source files', extensions: ['cpp', 'cc', 'cxx', 'c++', 'cp'] },
            { name: 'C source files', extensions: ['c'] },
            { name: 'Header files', extensions: ['h', 'hpp', 'rh', 'hh'] },
            { name: 'Resource files', extensions: ['rc'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    }

    dialog.showOpenDialog(WIN, options).then((result) => {
        if (result.filePaths === undefined) {
            return
        };
        if (typeof callback === 'function') {
            for (var file of result.filePaths) {
                callback(file.split("\\").pop().toString(), fs.readFileSync(file.toString()).toString(), file.toString())
            }
        }
    }).catch(err => console.log(err))
}

function readDirectory(path) {
    let files = []
    fs.readdirSync(path).forEach(file => {
        if (fs.existsSync(path + "\\" + file) && fs.lstatSync(path + "\\" + file).isDirectory()) {
            files.push({ title: file, files: readDirectory(path + "\\" + file) })
        } else {
            files.push(path + "\\" + file.toString())
        }
    });
    return files
}

export function openDirectory(callback) {
    const options = {
        title: "Open Directory",
        defaultPath: app.getPath('desktop'),
        buttonLabel: "Open",
        properties: ['openDirectory']
    }
    dialog.showOpenDialog(WIN, options).then((result) => {
        if (result.filePaths === undefined) {
            return
        };
        var files = readDirectory(result.filePaths[0])
        callback(files)
    }).catch(err => console.log(err))
}



// export function openDirectory(callback) {
//     const options = {
//         title: "Open Directory",
//         defaultPath: app.getPath('desktop'),
//         buttonLabel: "Open",
//         properties: ['openDirectory']
//     }
//     dialog.showOpenDialog(WIN, options).then((result) => {
//         if (result.filePaths === undefined) {
//             return
//         };
//         let files = []
//         fs.readdirSync(result.filePaths[0]).forEach(file => {
//             console.log(result.filePaths[0])
//             files.push(result.filePaths[0] + "\\" + file.toString())
//         });
//         callback(files)
//     }).catch(err => alert('there was an error opening the file.\n\n' + err))
// }


export function save(path, data, callback) {
    console.log('save called')
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log("An error ocurred creating the file: " + err.message)
            return
        }
        if (typeof callback === 'function')
            callback(path);
        console.log("The file has been succesfully saved at " + path);
    });
}

export function execute(path) {
    shell.openItem(path)
    // run_script("start", [path], null, write);
}

export function compileAndRun(path, data, callback, write) {
    if (path === undefined) {
        saveAs(data, (path) => {
            if (typeof callback === 'function')
                callback(path)
            run_script("g++", [path, "-o", path.replace(".cpp", ".exe"), null, write], () => execute(path.replace(".cpp", ".exe")))
        })
    } else {
        save(path, data, (path) => {
            if (typeof callback === 'function')
                callback(path)
            run_script("g++", [path, "-o", path.replace(".cpp", ".exe"), null, write], () => execute(path.replace(".cpp", ".exe")))
        })
    }
}

export function run(path, data, callback, write) {
    if (path === undefined) {
        saveAs(data, (path) => {
            if (typeof callback === 'function')
                callback(path)
            run_script("g++", [path, "-o", path.replace(".cpp", ".exe"), null, write], () => execute(path.replace(".cpp", ".exe")))
        })
    } else {
        execute(path.replace(".cpp", ".exe"))
    }
}

// export function compile(path, data, callback, write) {
//     if (path === undefined) {
//         saveAs(data, (path) => {
//             if (typeof callback === 'function')
//                 callback(path)
//             run_script("g++", [path, "-o", path.replace(".cpp", ".exe")], null, write)
//         })
//     } else {
//         save(path, data, (path) => {
//             if (typeof callback === 'function')
//                 callback(path)
//             run_script("g++", [path, "-o", path.replace(".cpp", ".exe")], null, write)
//         })
//     }
// }

export function compile({ path, data, callback, append, openTerminal }) {
    if (path === undefined) {
        saveAs(data, (path) => {
            if (typeof callback === 'function')
                callback(path)
            run_script("g++", [path, "-o", path.replace(".cpp", ".exe")], null, append, openTerminal)
        })
    } else {
        save(path, data, (path) => {
            if (typeof callback === 'function')
                callback(path)
            run_script("g++", [path, "-o", path.replace(".cpp", ".exe")], null, append, openTerminal)
        })
    }
}