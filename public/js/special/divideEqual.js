import fs from "fs";
import { join } from "path";

const divider = () => {
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("An error read file ....", err);
      return;
    }

    const dataArr = data.split("\n");

    const arr = [];
    const len = dataArr.length

    let diff = dataArr.length / db;
    diff = Math.floor(diff);
    let diff1 = diff
    for (let i = 0; i < len; i++) {
      if (diff1 == -1) {
        arr.push(dataArr.splice(i));
      } else arr.push([...dataArr].splice(i, diff1));
      i = (diff1 == -1) ? len : diff1;
      diff1 = ((diff1 + diff) >= dataArr.length) ? -1 : (diff1 + diff);
    }
    
    for (let c in arr){
        writeCSVFile(arr[c],fileName[c])
    }
  });
};

const writeCSVFile = (data, fileName) => {
    const dataTable = data.join("\n");
  
    const name = join(outputDir, fileName + ".csv");
  
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

const inputFilePath = "C:/Users/franc/Desktop/vip sheet/lead 2xlsx.csv";
const db = 2;
const fileName = ["rufuse", "rayan"];
const outputDir = "C:/Users/franc/Desktop/vip sheet/";

divider();
