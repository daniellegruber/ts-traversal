//const fs = require("graceful-fs");
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
const path = require("path");
const glob = require("glob");

export function writeToFile(out_folder, filename, generated_code) {
    if (!fs.existsSync(out_folder)){
        fs.mkdirSync(out_folder);
    }
    fs.writeFile(path.join(out_folder, filename), generated_code, err => {
      if (err) {
        console.error(err);
        return
      }
    })
}

export function getFilesInPath(src) {
    const files = glob.sync(src + '/**/*.m');
    return files;
};

export function getNonClassFilesInPath(src) {
    const files = glob.sync(src + '/!(@)**/*.m');
    return files;
};

// https://www.mathworks.com/help/matlab/matlab_oop/organizing-classes-in-folders.html
export function getClassFolders(src) {
    const folders = glob.sync(src + '/@**');
    return folders;
};

type Class = {
    name: string;
    methods: Array<string>;
    folder: string;
};

export function getClasses(src) {
    let folders = getClassFolders(src);
    let classes: Class[] = [];
    for (let folder of folders) {
        let files = getFilesInPath(folder);
        let methods = [];
        for (let file of files) {
            methods.push(path.parse(file).name);
        }
        const c: Class = {
            name: folder.substr(folder.indexOf("@") + 1),
            methods: methods,
            folder: folder
        }
        classes.push(c);
    }
    return classes;
};