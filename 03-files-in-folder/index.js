let fs = require('fs');
const path = require('path');
let filePath = path.resolve(__dirname, 'secret-folder');

fs.readdir(filePath,
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if(file.isFile()){
          getFileInfo(file).then((file)=>{
            console.log(`${file[0]} - ${file[1]} - ${file[2].toFixed(3)} kb`);
          })
        }
      })
    }
  }
)

async function getFileInfo(aFile){
  let fp = path.resolve(filePath, aFile.name);
  return new Promise(resolve => {
    fs.stat(fp, (err,stats)=>{
      let fileInfo = [
        path.parse(aFile.name).name,
        path.parse(aFile.name).ext.substring(1),
          stats.size / 1024
        ]
      resolve(fileInfo);
    })
  })
}