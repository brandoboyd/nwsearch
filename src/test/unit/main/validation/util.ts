
// Retrieve all files under a directory
export function retrieveFileList(dir) {
    let fs = require('fs');
    let path = require('path');
    dir = path.normalize(dir);
    return fs.readdirSync(dir).reduce(function (list, file) {
        let name = path.join(dir, file);
        let isDir = fs.statSync(name).isDirectory();
        return list.concat(isDir ? this.retrieveFileList(name) : [name]);
    }, []);
}

// Locate the first matched key:value pair from the supplied json haystack
export function findFirstMatchedObjInArray(key, value, haystack, strict) {
    for (let i = 0; i < haystack.length; i++) {
        if (typeof strict !== 'undefined' && strict === true) {
            if (haystack[i][key] === value) return haystack[i];
        }/* else {//TSLint does not like it.
            if (haystack[i][key] == value) return haystack[i];
        }*/
    }
    return false;
}

module.exports = {retrieveFileList, findFirstMatchedObjInArray};

