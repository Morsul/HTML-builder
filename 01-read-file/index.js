var fs = require('fs');
const path = require('path');
let filePath = path.resolve(__dirname, 'text.txt');

var readFile = new fs.createReadStream(filePath, 'utf8');

readFile.on('data', (aData)=>{
  console.log(aData)
})