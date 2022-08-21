const fs = require("fs");

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

