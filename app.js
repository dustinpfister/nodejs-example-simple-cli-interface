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
    // char and hex strings
    let char = data.toString(),
    hex = data.toString('hex');

    // exit code check
    if(char.toLowerCase() === 'q' || hex === '03'){
        onQuit();
    }else{
       console.log(hex);
    }
});


