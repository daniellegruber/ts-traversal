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
let out_folder = `${args[1]}/generatedCode/${name}`;
if (!fs.existsSync(`${out_folder}/matlabToRun`)){
    fs.mkdirSync(`${out_folder}/matlabToRun`);
}

if (!fs.existsSync(`${out_folder}/matlabToRun/${name}_torun.m`)){
    //fs.copyFile(`${OCTAVEC}/tests/${mfile}`, `${out_folder}/${mfile}`, (err) => {
    fs.copyFile(`${out_folder}/${mfile}`, `${out_folder}/matlabToRun/${name}_torun.m`, (err) => {
        if (err) throw err;
    });
    
    setTimeout(function () {
        
        let code = fs.readFileSync(`${out_folder}/matlabToRun/${name}_torun.m`, "utf8");
        let expression = [];
        expression.push("addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');")
        expression.push(`addpath('${out_folder}/matlabToRun');`);
        expression.push(`fileID = fopen('${out_folder}/output.txt','w');\n`);
        code = expression.join("\n") + code;
        
        // Replace disp with dispArr
        code = code.replace(/disp\(/g, 'dispArr(fileID, ');
        let fun_defs = code.match(/function(?:(?!function|end[\r\n])[\s\S])*end/gm);
        //console.log(fun_defs);
        if (fun_defs != null) {
            for (let i = 0; i < fun_defs.length; i++) {
                let match = fun_defs[i].match(/function.* ([A-Za-z0-9_]+)\(/);
                let name = match[1];
                let re = new RegExp(`${name}\\(`, 'g');
                code = code.replace(re, `${name}(fileID, `);
            }
        }
        
        fun_defs = code.match(/function(?:(?!function|end[\r\n])[\s\S])*end/gm);
        if (fun_defs != null) {
            for (let i = 0; i < fun_defs.length; i++) {
                let match = fun_defs[i].match(/function.* ([A-Za-z0-9_]+)\(/);
                let name = match[1];
                let re = new RegExp(`${name}\\(`, 'g');
                code = code.replace(fun_defs[i], '');
                writeToFile(`${out_folder}/matlabToRun`, `${name}.m`, fun_defs[i]);
            }
        }
        
        writeToFile(`${out_folder}/matlabToRun`, `${name}_torun.m`, code);
        
    }, 8000);
    
}

