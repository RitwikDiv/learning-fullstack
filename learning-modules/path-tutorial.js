const path = require('path');

var pathObj = path.parse(__filename);

console.log("Path Object: ", pathObj);

var baseName = path.basename(pathObj.base);

console.log("Base Name: ", baseName);

var fileName = "sampleImage.jpg";

console.log("File type: ", path.extname(fileName));