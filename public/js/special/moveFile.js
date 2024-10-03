import fs from "fs";
import path, { join } from "path";
import { readdirSync } from "fs";

const moveFile = (des, sources) => {
  let c = 0;
  sources.forEach((dPath) => {
    console.log(dPath);
    const fPath = getCsvFiles(dPath);
    fPath.forEach((p) => {
      const fileName = path.basename(p);
      c++;
      move(p, join(des, c + fileName));
    });
  });
};

const move = (src, des) => {
  fs.copyFile(src, des, (err) => {
    if (err) throw err;
    fs.unlink(source, (err) => {
      if (err) throw err;
      console.log(`File moved from ${source} to ${destination}`);
    });
  });
};

// Function to get all folder paths in a directory
function getFolders(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter((file) => {
      return fs.statSync(path.join(dirPath, file)).isDirectory();
    })
    .map((folder) => {
      return path.join(dirPath, folder);
    });
}

const newPath = (paths) => {
  const arr = paths[0].split("\\");
  arr.pop();
  return arr.join("/");
};

function getCsvFiles(dPath) {
  const folderName = dPath.replace(/\\/g, "/");
  const files = readdirSync(folderName);

  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv"
  );

  const csvFilePaths = csvFiles.map((file) => path.join(folderName, file));

  return csvFilePaths;
}

// Example usage
const folderPath =
  "F:/datas/DATA/data/CALO BH2E-20240206T105701Z-001/CALO BH2E";
const folders = getFolders(folderPath);
const nPath = newPath(folders);

moveFile(nPath, folders);
