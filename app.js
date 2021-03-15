#!/usr/bin/env node


// to quit call process.exit with exit code
let onQuit = function(code){
   // assume value of process.exitCode if noe status code is given
   code = code === undefined ? process.exitCode : code;
   // print a line feed
   process.stdout.write('\n');
   process.exit(code);
};

//set in raw mode and capture key strokes
process.stdin.setRawMode(true);

// for each data event from the standard input
process.stdin.on('data', (data) => {

    let char = data.toString();
    if(char.toLowerCase() === 'q'){
        onQuit();
    }

});


