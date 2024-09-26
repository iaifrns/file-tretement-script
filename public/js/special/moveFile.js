import fs from 'fs';
import path from 'path';

const moveFile = () => {

}

// Function to get all folder paths in a directory
function getFolders(dirPath) {
    return fs.readdirSync(dirPath).filter((file) => {
        return fs.statSync(path.join(dirPath, file)).isDirectory();
    }).map((folder) => {
        return path.join(dirPath, folder);
    });
}

// Example usage
const folderPath = '/path/to/your/directory';
const folders = getFolders(folderPath);
console.log(folders); // Outputs array of folder paths
