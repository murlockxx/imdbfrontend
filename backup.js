const fs = require('fs');
const path = require('path');

const deleteFolderRecursive = function(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

// Adjust the path if your node_modules is in a different location
deleteFolderRecursive('node_modules');
console.log('node_modules deleted');

// Correct the path to 'package-lock.json' if it's in the same directory as this script
try {
  fs.unlinkSync('package-lock.json');
  console.log('package-lock.json deleted');
} catch (err) {
  console.error(err);
}
