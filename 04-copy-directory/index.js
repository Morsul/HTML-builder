let fs = require('fs');
const path = require('path');

const sourceFolder = path.resolve(__dirname, 'files');
const destinationFolder = path.resolve(__dirname, 'files-copy');

fs.rm(destinationFolder,{ recursive: true, force: true }, ()=>{
  fs.mkdir(destinationFolder, {recursive: true}, ()=>{
    fs.readdir(sourceFolder,
      { withFileTypes: true },
      (err, files) => {
        if (err)
          console.error(err);
        else {
          files.forEach(file =>{
            if(file.isFile()){
              fs.copyFile(`${path.resolve(sourceFolder, file.name)}`,
                          `${path.resolve(destinationFolder, file.name)}`,
                          ()=>{}
              )
            }
          })
        }
      }
    )
  })
})


