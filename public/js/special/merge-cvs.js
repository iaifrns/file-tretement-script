import { createReadStream, createWriteStream, readdirSync } from "fs";
import csvParser from "csv-parser";
import { write } from "fast-csv";
import path, { join } from "path";

const fileLocation = "D:/25-52-54-55-57-67-68-70-88-90";
const finalLocation = "C:/Users/franc/Desktop/vip sheet/";

function getCsvFiles(folderName) {
  const files = readdirSync(folderName);

  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv"
  );

  const csvFilePaths = csvFiles.map((file) => path.join(folderName, file));

  return csvFilePaths;
}

const inputFiles = getCsvFiles(fileLocation); // Add your CSV file names here pagesjaunes (24)
const outputFile = "merge list done.csv";
/* const columnsToStay = [
  "bi-denomination",
  "pj-lb",
  "bi-description",
  "annonceur",
  "number-contact 2",
  "annonceur 2",
  "number-contact",
]; */

const columnsToStay = [
  "NOM DU CLIENT",
  "PRENOM DU CLIENT",
  "EMAIL",
  "ADRESSE",
  "VILLE",
  "CODE POSTAL",
  "TELEPHONE",
  "MOBILE",
];

const mergedData = [];
let headers = null;

function mergeCSVFiles(inputFiles, outputFile) {
  let filesProcessed = 0;

  inputFiles.forEach((file) => {
    const filePath = file;
    createReadStream(filePath)
      .pipe(csvParser())
      .on("headers", (fileHeaders) => {
        if (!headers) {
          console.log(fileHeaders)
          headers = fileHeaders;
          mergedData.push(headers);
        }
      })
      .on("data", (row) => {
        const filteredRow = headers.map((column) => {
          return row[column];
        });
        mergedData.push(Object.values(filteredRow));
      })
      .on("end", () => {
        filesProcessed++;
        if (filesProcessed === inputFiles.length) {
          writeMergedCSV(outputFile);
        }
      });
  });
}

function writeMergedCSV(outputFile) {
  const finalPath = join(finalLocation, outputFile);
  const ws = createWriteStream(finalPath);
  write(mergedData, { headers: true })
    .pipe(ws)
    .on("finish", () => {
      console.log("CSV files merged successfully");
    });
}

mergeCSVFiles(inputFiles, outputFile);