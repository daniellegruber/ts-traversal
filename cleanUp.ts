var fs = require('fs');
var path = require("path");
let OCTAVEC = "/home/dlg59/project/Halo-Algorithm/OctaveC";
import { writeToFile } from "./helperFunctions";

const args = process.argv.slice(2);

if (args.length != 2) {
    process.exit(1);
}

let mfile = args[0];
let name = path.parse(mfile).name;
let out_folder = args[1] + "/generatedCode/" + name;
if (!fs.existsSync(out_folder)){
fs.mkdirSync(out_folder);
}

if (!fs.existsSync(`${out_folder}/${name}.c`)){
    fs.copyFile(`${OCTAVEC}/tests/${name}.c`, `${out_folder}/octavec_main.c`, (err) => {
        if (err) throw err;
    });
    
    setTimeout(function () {
        
        let code = fs.readFileSync(`${out_folder}/octavec_main.c`, "utf8");
        
        code = code.replace('#include "../matrix.h"', '#include <matrix.h>');
        
        writeToFile(out_folder, "octavec_main.c", code);
        
    }, 8000);
}

if (!fs.existsSync(`${out_folder}/${mfile}`)){
    fs.copyFile(`${OCTAVEC}/tests/${mfile}`, `${out_folder}/${mfile}`, (err) => {
        if (err) throw err;
    });
    
    setTimeout(function () {
        
        let code = fs.readFileSync(`${out_folder}/${mfile}`, "utf8");
    
        // Comment out directives
        let comment_lines = ["more", "format", "source"];
        for (let comment_line of comment_lines) {
            //let re = new RegExp(`^(${comment_line}|\n${comment_line})\\s[\\w;\.]*\\n`, "g");
            let re = new RegExp(`${comment_line}\\s[\\w;\.]*\\n`, "g");
            let match = code.match(re);
            if (match != null) {
                code = code.replace(re, `%${match}`);
            }
        }
        
        // Replace binary operators in complex numbers
        //code = code.replace(/(\*i)|(\*I)|/g, 'i');
        code = code.replace(/\*I/g, 'i');
        code = code.replace(/\*i/g, 'i');
        
        // Replace augmented assignment
        let idx = code.indexOf("++");
        while (idx != -1) {
            let tmp = code.slice(0,idx).split(/[\s,\n]/);
            let variable = tmp.splice(-1);
            code = code.replace(`${variable}++`, `${variable} = ${variable} + 1`);
            idx = code.indexOf("++");
        }
        
        // Replace complexDisp and doubleDisp
        code = code.replace(/complexDisp/g, 'disp');
        code = code.replace(/doubleDisp/g, 'disp');
        code = code.replace(/intDisp/g, 'disp');
        //code = code.replace(/printf/g, 'sprintf');
        code = code.replace(/printf/g, 'disp');
        
        writeToFile(out_folder, mfile, code);
        
    }, 8000);
    
    

}
