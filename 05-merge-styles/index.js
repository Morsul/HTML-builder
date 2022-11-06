let fs = require('fs');
const path = require('path');
const sourceFolder = path.resolve(__dirname, 'styles');
const destinationFolder = path.resolve(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(destinationFolder,'', ()=>{});

fs.readdir(sourceFolder,
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file=>{
        if(file.isFile() && path.extname(file.name)=='.css'){

          let readFile = new fs.createReadStream(path.resolve(sourceFolder, file.name), 'utf8');

          readFile.on('data', (aData)=>{
            fs.appendFile(destinationFolder, aData, ()=>{})
          })
        }
      })
    }

  }
)