let fs = require('fs');
let fsPromise = require('fs/promises');
const path = require('path');

const projectDist = path.resolve(__dirname, 'project-dist')
const htmlFile = path.resolve(projectDist, 'index.html')
const assetsPath = path.resolve(projectDist, 'assets')
const cssFile = path.resolve(projectDist, 'style.css')

async function createFolder(aFolder){
  await fsPromise.rm(aFolder,{ recursive: true, force: true })
  await fsPromise.mkdir(aFolder, {recursive: true})
}

async function createHtml(){
  let readTemplate = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf8');
  let componentFolder = path.resolve(__dirname, 'components')
  let componentList = await fsPromise.readdir(componentFolder, { withFileTypes: true });

  let innerHtml = ''
  readTemplate.on('data',(data)=>{
    innerHtml = data;
  })

  readTemplate.on('end', ()=>{
    componentList.forEach((file, i)=>{
      if(file.isFile() && path.extname(file.name)=='.html'){
        let fileName = path.parse(file.name).name
        fsPromise.readFile(path.resolve(componentFolder, file.name), "utf8").then(
          (data)=>{
            innerHtml = innerHtml.replace(`{{${fileName}}}`,  data);
            if(componentList.length-1 == i){
              fs.writeFile(htmlFile, innerHtml,()=>{})
            }
          })
      }
    })
  })
}

async function createCSS(){
  let stylesFolder = path.resolve(__dirname, 'styles')
  let styleList = await fsPromise.readdir(stylesFolder, { withFileTypes: true });
  styleList.forEach(style =>{
    if(style.isFile() && path.extname(style.name)=='.css'){
      fsPromise.readFile(path.resolve(stylesFolder, style.name), "utf8").then(
        (data)=>{
          fs.appendFile(cssFile, data,()=>{})
        })
    }
  })
}

async function copyFiles(aFrom, aTo){
  await createFolder(aTo)
  let itemList = await fsPromise.readdir(aFrom, { withFileTypes: true });

  itemList.forEach(item =>{
    let itemName = path.parse(item.name).name
    if(item.isDirectory()){
      copyFiles(path.resolve(aFrom, itemName), path.resolve(aTo, itemName))
    }
    if(item.isFile()){
      fs.copyFile(`${path.resolve(aFrom, item.name)}`,
                  `${path.resolve(aTo, item.name)}`, ()=>{}
      )
    }
  })
}

async function buildPage(){
  await createFolder(projectDist)
  createHtml()
  createCSS()
  await copyFiles(path.resolve(__dirname, 'assets'), assetsPath)
}

buildPage()