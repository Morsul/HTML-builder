let fs = require('fs');
const path = require('path');
let filePath = path.resolve(__dirname,'text.txt');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function letsCreateFile(aString = ''){
  fs.appendFile(filePath, aString, ()=>{})
  letsReadConsole()
}

var letsReadConsole = function(){
  readline.question('Can you type some text for task? ("exit" gona quit inputmode) \n', data => {
    if(data !='exit'){
      letsCreateFile(data)
    } else {
      console.log('You exited input mode')
      readline.close();
    }

  });
}

if (process.platform === "win32") {
  readline.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}
process.on("SIGINT", function () {
  console.log('You exited input mode')
  readline.close();
  process.exit();
});

letsCreateFile()

