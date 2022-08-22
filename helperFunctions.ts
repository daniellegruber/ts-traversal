const fs = require("fs");
const path = require("path");

export function writeToFile(out_folder, filename, generated_code) {
    if (!fs.existsSync(out_folder)){
        fs.mkdirSync(out_folder);
    }
    fs.writeFile(out_folder + "/" + filename, generated_code, err => {
      if (err) {
        console.error(err);
        return
      }
    })
}

export const getFilesInPath = (fullPath) => {
    let files = []; 
    fs.readdirSync(fullPath).forEach(file => {
        const absolutePath = path.join(fullPath, file); 
        if (fs.statSync(absolutePath).isDirectory()) {
            const filesFromNestedFolder = getFilesInPath(absolutePath); 
            filesFromNestedFolder.forEach(file => { files.push(file); }) 
        } else return files.push(absolutePath); 
    }); 
    return files; 
}