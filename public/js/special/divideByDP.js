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

  createDir(finalFilePath1);
  createDir(finalFilePath2);

  write(name1, dataTable1);
  write(name2, dataTable2);
};

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const write = (name, dataTable) => {
  fs.writeFile(name, dataTable, (err) => {
    if (err) {
      console.log("failed ....", err);
      return;
    }
    console.log("success ....");
  });
};

const docPath = "C:/Users/franc/Desktop/vip sheet/thermostat file 1"; //"C:/Users/franc/Desktop/vip sheet/done3"; // Path for the output CSV file
const finalFilePath1 = "C:/Users/franc/Desktop/vip sheet/thermostat file 1/bon departement1";
const finalFilePath2 = "C:/Users/franc/Desktop/vip sheet/thermostat file 1/autre";

const dps = [
  "62",
  "59",
  "80",
  "60",
  "91",
  "92",
  "93",
  "94",
  "95",
  "78",
  "77",
  "27",
  "28",
  "55",
  "54",
  "57",
  "67",
  "68",
  "90",
  "88",
  "52",
  "25",
  "21",
  "35",
  "53",
  "56",
  "72",
  "37",
  "41",
  "36",
  "22",
  "29",
  "85",
  "79",
  "86",
  "44",
  "49",
  "69",
  "38",
  "73",
  "74",
  "01",
  "42",
  "63",
  "03",
  "23",
  "19",
  "15",
  "43",
  "71",
  "33",
  "24",
  "19",
  "16",
  "17",
  "87",
];

const oldDps = [
  "25",
  "52",
  "54",
  "55",
  "57",
  "67",
  "68",
  "70",
  "88",
  "90",
  "76",
  "27",
  "80",
  "60",
];

const treateDpArr = () => {
  const newSet = new Set();
  dps.forEach((dp) => {
    newSet.add(dp);
  });

  let arr = [...newSet];

  /* oldDps.forEach(dp=> {
    const ids = arr.indexOf(dp)
    if(ids != -1){
      arr = arr.filter((_,i)=>(i!=ids))
    }
  }) */

  return arr;
};

function getCsvFiles(folderName) {
  const files = readdirSync(folderName);

  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv"
  );

  const csvFilePaths = csvFiles.map((file) => path.join(folderName, file));

  return csvFilePaths;
}

const fileP = getCsvFiles(docPath);

const correctDp = treateDpArr();

fileP.forEach((file) => {
  getDataAndDivide(file);
});
