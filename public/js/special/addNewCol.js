import fs from "fs";
import path, { join } from "path";
import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";

const inputFilePath =
  "C:/Users/franc/Desktop/vip sheet/done3/bon departement.csv"; // Replace with your CSV file path
const outputDir = "C:/Users/franc/Desktop/vip sheet/done3"; // Directory to save the split CSV files

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const columnToSplit1 = 6; // Column name or index to split by (e.g., 'G' or 6 for column G)
const columnToSplit2 = 7; // Column name or index to split by (e.g., 'G' or 6 for column G)
const data = [];

let column1;
let column2;
let header;

const FilterNum = (s1, s2, str1, str2) => {
  const corr = ["337", "336"];
  if (s1.length < 3) {
    return str2;
  }
  if (s2.length < 3) {
    return str1;
  }

  let n1 = corr.indexOf(s1);

  if (n1 == -1) {
    return str2;
  }

  return str1;
};

fs.createReadStream(inputFilePath)
  .pipe(csvParser({ separator: ";" }))
  .on("headers", (headers) => {
    // Store the index of the column to split by
    header = [...headers, "Tel"];
  })
  .on("data", (row) => {
    const values = Object.values(row);

    column1 = (values[columnToSplit1] ?? "   ").slice(0, 3);
    column2 = (values[columnToSplit2] ?? "   ").slice(0, 3);

    const lastNum = FilterNum(
      column1,
      column2,
      values[columnToSplit1],
      values[columnToSplit2]
    );

    data.push([...values, lastNum]);
  })
  .on("end", () => {
    // Create separate CSV files for each unique prefix
    writeCSVFile(header, data);
  });

const writeCSVFile = (header, data) => {
  const dataTable = [header, ...data].join("\n");

  const name = join(outputDir, "done" + ".csv");

  fs.writeFile(name, dataTable, (err) => {
    if (err) {
      console.log("failed ....", err);
      return;
    }
    console.log("success ....");
  });
};
