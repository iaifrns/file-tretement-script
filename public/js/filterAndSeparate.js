import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";

const inputFilePath = "C:/Users/franc/Desktop/vip sheet/sheet 2/654888.csv"; // Replace with your CSV file path
const outputDir = "C:/Users/franc/Desktop/vip sheet/sheet 2/output2"; // Directory to save the split CSV files

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const columnToSplit = 6; // Column name or index to split by (e.g., 'G' or 6 for column G)
const data = {};

let columnToSplitIndex;

fs.createReadStream(inputFilePath)
  .pipe(csvParser())
  .on("headers", (headers) => {
    // Store the index of the column to split by
    columnToSplitIndex = headers.indexOf(columnToSplit);
  })
  .on("data", (row) => {
    
    const [keys, values] = Object.entries(row)[0];

    // Split the strings into arrays
    const keysArray = keys.split(";");
    const keysValue = values.split(";");
    
    if (keysValue[columnToSplit]) {
      const key = keysValue[columnToSplit].toString().substring(0, 2);
      //console.log(key)
      if (!data[key]) {
        data[key] = [];
      }
      data[key].push(keysValue);
    }
  })
  .on("end", () => {
    // Create separate CSV files for each unique prefix
    Object.keys(data).forEach(async (key) => {
      const csvWriter = createObjectCsvWriter({
        path: path.join(outputDir, `${key}.csv`),
        header: Object.keys(data[Object.keys(data)[0]][0]).map((field) => ({
          id: field,
          title: field,
        })),
      });

      await csvWriter.writeRecords(data[key]);
      console.log(`Created ${key}.csv`);
    });
  });
