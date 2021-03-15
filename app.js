#!/usr/bin/env node

// to quit call process.exit with exit code
let onQuit = (code) => {
   // assume value of process.exitCode if noe status code is given
   code = code === undefined ? process.exitCode : code;
   // print a line feed
   process.stdout.write('\n');
   // end process with exit code
   process.exit(code);
};

// if process.stdin.setRawMode, enter raw mode
// this seems to end up being undefined when piping stdin
// ( $ echo "abcdq" | node app.js )
// however it will be there when called directly
// ( $ node app.js )
// which is fine becuase I only want to enter raw mode
// when the script is called that way
let isRaw = () => {
    if(process.stdin.setRawMode){
       return true;
    }
    return false;
};

// what to do with a single byte buffer
let processByte = (buff) => {
    console.log(buff);
};

// enter raw mode if possible
if(isRaw()){
    process.stdin.setRawMode(true);
}

let modes = {
    // for raw mode ( $ node app.js)
    raw: (data) => {
        // char and hex strings
        let char = data.toString(),
        hex = data.toString('hex');
        // exit code check (press q,Q, or ctrl+c aka '03' in hex)
        if(char.toLowerCase() === 'q' || hex === '03'){
            onQuit();
        }else{
            //process.stdout.write(data.length + '\n');
            //process.stdout.write(hex + '\n');
            if(data.length === 1){
                processByte(data);
            }
        }
    },
    // for pipping ( $ echo -n "abcd" | node app.js)
    notRaw: (data) => {
        var i = 0,
        len = data.length;
        while(i < len){
            processByte(data.slice(i, i + 1));
            i += 1;
        }
    }
};

// for each data event from the standard input
process.stdin.on('data', (data) => {
    if(isRaw()){
        modes['raw'](data);
    }else{
        modes['notRaw'](data);
    }
});
