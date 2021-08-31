const fs = require("fs");
const path = require("path/posix");
const utils = require("../sproto-js/utils.js");

function readBinary(filepath) {
    let raw = fs.readFileSync(filepath);
    if (!raw) {
        console.log("not found file(" + filepath + ")");
    }
    return raw;
}
function transform(filepath) {
    const name = path.basename(filepath);
    const prefix = path.dirname(filepath);
    const binary = readBinary(filepath);
    const array = utils.arraybuffer2array(binary.buffer);
    
    fs.writeFileSync(path.join(prefix, name.replace("spb", "json")), JSON.stringify(array), "utf-8")
}

transform("./src/assets/c2s.spb");
transform("./src/assets/s2c.spb")