import fs from "fs";
import path, { join } from "path";
import { readdirSync } from "fs";

const findTelIndex = (row) => {
  let ind = -1;
  let r = /^\d+$/;
  row.forEach((data, index) => {
    if (r.test(data?.trim() ?? "") || r.test(data?.trim() ?? "")) {
      if (data.length < 9 && data.length > 2) {
        ind = index;
      }
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

    const newData = { "bon departement": [], autre: [] };

    const s = header.split(";").length > 2 ? ";" : ",";

    const index = findTelIndex((dataTable[0] ?? "ldkjl").split(s));

    if (index == -1) return;

    dataTable.forEach((row) => {
      const arrRow = row.split(s);
      const str = arrRow[index]?.slice(0, 2) ?? "";
      const ind = correctDp.indexOf(str);

      if (ind != -1) {
        newData["bon departement"].push(row);
      } else newData.autre.push(row);
    });

    writeCSVFile(header, newData, path.basename(filePath).replace(".csv", " "));
  });
};

const writeCSVFile = (header, data, fileName) => {
  const dataTable1 = [header, ...data["bon departement"]].join("\n");
  const dataTable2 = [header, ...data["autre"]].join("\n");

  const name1 = join(finalFilePath1, "bon departement IDF" + fileName + ".csv");
  const name2 = join(finalFilePath2, "autre " + fileName + ".csv");

  createDir(finalFilePath1)
  createDir(finalFilePath2)

  write(name1, dataTable1);
  write(name2, dataTable2);
};

const createDir = (dir) => {
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
    }
}

const write = (name, dataTable) => {
  fs.writeFile(name, dataTable, (err) => {
    if (err) {
      console.log("failed ....", err);
      return;
    }
    console.log("success ....");
  });
};

const docPath = "F:/datas/DATA/B to C"; // Path for the output CSV file
const finalFilePath1 = "F:/datas/DATA/done/autre/bon departement";
const finalFilePath2 = "F:/datas/DATA/done/autre/autre";

const correctDp = [
  "38",
  "73",
  "74",
  "01",
  "69",
  "42",
  "43"
];

function getCsvFiles(folderName) {
  const files = readdirSync(folderName);

  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv"
  );

  const csvFilePaths = csvFiles.map((file) => path.join(folderName, file));

  return csvFilePaths;
}

const fileP = getCsvFiles(docPath);

fileP.forEach((file) => {
  getDataAndDivide(file);
});
