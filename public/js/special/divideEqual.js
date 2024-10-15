import fs from "fs";
import { join } from "path";

const divider = () => {
  if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir)
  }
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("An error read file ....", err);
      return;
    }

    const dataArr = data.split("\n");

    const arr = [];
    const len = dataArr.length;

    let diff = dataArr.length / db;
    diff = Math.floor(diff);
    let diff1 = diff;
    for (let i = 0; i < len; i++) {
      if (diff1 == -1) {
        arr.push(dataArr);
      } else arr.push(dataArr.splice(i, diff1));
      console.log(i, diff1, [...dataArr].splice(i, diff1).length);
      i = diff1 == -1 ? len : 0;
      diff1 = diff >= dataArr.length ? -1 : diff;
    }

    for (let c in arr) {
      writeCSVFile(arr[c], fileName,c);
    }
  });
};

const writeCSVFile = (data, fileName, i) => {
  const dataTable = data.join("\n");

  const name = join(outputDir, fileName + `, ${i}.csv`);

  write(name, dataTable);
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

const inputFilePath = "C:/Users/franc/Desktop/vip sheet/thermostat file 1/bon departement1/done/fiche5.csv";
const db = 41;
const fileName ="fiche 5";
const outputDir = "C:/Users/franc/Desktop/vip sheet/done/fiche 5";

divider();
