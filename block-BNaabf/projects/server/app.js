var path = require('path');

// - get relative path of `index.js`
console.log("../client/index.js");

//  absolute path
var absoluteIndex = path.join(__dirname , "..", 'client/index.js');
console.log(absoluteIndex)



