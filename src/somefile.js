//Uses node.js process manager
const child_process = window.require('child_process');

// This function will output the lines from the script 
// and will return the full combined output
// as well as exit code when it's done (using the callback).
function run_script(command, args, callback, write) {
    var child = child_process.spawn(command, args, {
        encoding: 'utf8',
        shell: true
    });

    // You can also use a variable to save the output for when the script closes later
    child.on('error', (error) => {
        write(error)
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data = data.toString();
        write(data);
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {

        //Here is the output from the command

        write(data);
    });

    child.on('close', (code) => {
        //Here you can get the exit code of the script  
        switch (code) {
            case 0:
                if (typeof callback === 'function')
                    callback()
                break;
            case 1:
                write(code)
                break

        }



    });
}

export default run_script;