import fs from "fs";
import { join } from "path";

const getDataAndDivide = () => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Could not open the file sorry", err);
      return;
    }
    const dataTable = data.split("\n");
    const header = dataTable.shift();

   /*  const newData = {"entreprise": [], "personnel": []} */
    const newData = { "bon departement": [], autre: [] };

    /* dataTable.forEach((row) => {
      const arrRow = row.split(";");
      console.log(arrRow[index - 1]?.slice(0, 3) ?? "");
      if (
        (arrRow[index - 1]?.slice(0, 3) ?? "") == "336" ||
        (arrRow[index - 1]?.slice(0, 3) ?? "") == "337"
      ) {
        newData.personnel.push(row);
      } else newData.entreprise.push(row);
    }); */

    dataTable.forEach((row) => {
      const arrRow = row.split(",");
      const str = (arrRow[index - 1]?.slice(0, 2)??"");
      const ind = correctDp.indexOf(str);

      if (ind != -1) {
        newData["bon departement"].push(row);
      } else newData.autre.push(row);
    });

    writeCSVFile(header, newData);
  });
};

const writeCSVFile = (header, data) => {
  for (let key in data) {
    const dataTable = [header, ...data[key]].join("\n");

    const name = join(finalFilePath, key + "LISTE 77 26.12.csv");

    fs.writeFile(name, dataTable, (err) => {
      if (err) {
        console.log("failed ....", err);
        return;
      }
      console.log("success ....");
    });
  }
};

const filePath =
  "C:/Users/franc/Desktop/vip sheet/sheet 1/CNTE-20240206T105723Z-001/CNTE/csv/done/final-leadsPv&Pacv.csv"; // Path for the output CSV file
const finalFilePath =
  "C:/Users/franc/Desktop/vip sheet/sheet 1/CNTE-20240206T105723Z-001/CNTE/csv/done/";
const index = 3;

const correctDp = [
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
getDataAndDivide();
