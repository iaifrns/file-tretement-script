import fs from "fs";
import path, { join } from "path";
import { readdirSync } from "fs";

const findTelIndex = (row) => {
  let ind = -1;
  let r = /^\d+$/;
  row.forEach((data, index) => {
    if (
      r.test(data?.slice(0, 3) ?? "") ||
      r.test(data?.slice(0, 2) ?? "") ||
      (data?.slice(0, 3) ?? "") == "TEL" ||
      (data?.slice(0, 3) ?? "") == "tel" ||
      (data?.slice(0, 3) ?? "") == "Tel"
    ) {
      if (data.length >= 9) ind = index;
    }
  });

  return ind;
};

const getDataAndDivide = (filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Could not open the file sorry", err);
      return;
    }
    const dataTable = data.split("\n");
    const header = dataTable.shift();

    const s = (header.split(';').length > 2) ? ';' : ','

    const index = findTelIndex(dataTable[0].split(s));

    const newData = { entreprise: [], personnel: [] };

    dataTable.forEach((row) => {
      const arrRow = row.split(s);
      if (
        (arrRow[index]?.slice(0, 3) ?? "") == "336" ||
        (arrRow[index]?.slice(0, 2) ?? "") == "06" ||
        (arrRow[index]?.slice(0, 2) ?? "") == "07" ||
        (arrRow[index]?.slice(0, 1) ?? "") == "6" ||
        (arrRow[index]?.slice(0, 1) ?? "") == "7" ||
        (arrRow[index]?.slice(0, 3) ?? "") == "337"
      ) {
        newData.personnel.push(row);
      } else newData.entreprise.push(row);
    });

    writeCSVFile(header, newData, path.basename(filePath).replace(".csv", " "));
  });
};

const writeCSVFile = (header, data, fileName) => {
  const dataTable1 = [header, ...data['entreprise']].join("\n");
  const dataTable2 = [header, ...data['personnel']].join("\n");

  const name1 = join(finalFilePath1, 'entreprise ' + fileName + `-${folder}` + ".csv");
  const name2 = join(finalFilePath2, 'personnel ' + fileName + `-${folder}` + ".csv");

  write(name1, dataTable1)
  write(name2, dataTable2)
  
};

const write = (name, dataTable)=>{
    fs.writeFile(name, dataTable, (err) => {
        if (err) {
          console.log("failed ....", err);
          return;
        }
        console.log("success ....");
      });
}

const dirPath = "F:/datas/DATA/data/CALO 2-20240206T101857Z-001/CALO 2/EHPAD/CSV"; // Path for the output CSV file
const finalFilePath1 = "F:/datas/DATA/B to B";
const finalFilePath2 = "F:/datas/DATA/B to C";
const folder = "CALO 2-EHPAD"

function getCsvFiles(folderName) {
  const files = readdirSync(folderName);

  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv"
  );

  const csvFilePaths = csvFiles.map((file) => path.join(folderName, file));

  return csvFilePaths;
}

const FilesPath = getCsvFiles(dirPath);

FilesPath.forEach((path) => {
  getDataAndDivide(path);
});
