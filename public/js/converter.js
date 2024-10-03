import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import { readdirSync } from "fs";

// Function to convert .xlsx to .csv
function convertXlsxToCsv(inputFilePath, outputDir) {
  // Read the .xlsx file
  const workbook = xlsx.readFile(inputFilePath);

  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert the worksheet to CSV
  const csvData = xlsx.utils.sheet_to_csv(worksheet);

  // Get the output file name and path
  const outputFileName = path.basename(inputFilePath, ".xlsx") + ".csv";
  const outputFilePath = path.join(outputDir, outputFileName);

  // Write the CSV data to the file
  if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir)
  }
  fs.writeFileSync(outputFilePath, csvData, "utf8");

  console.log(`File successfully converted to ${outputFilePath}`);
}

function getCsvFiles(folderName) {
  const files = readdirSync(folderName);

  let csvFilePaths = files.filter(file => file.toLowerCase().includes('.xlsx'));
  csvFilePaths = csvFilePaths.map((file) => path.join(folderName, file));

  return csvFilePaths;
}

// Usage Example
const inputFilePath = "C:/Users/franc/Desktop/vip sheet";

const fileList = getCsvFiles(inputFilePath);
console.log(fileList);
const outputDir = "C:/Users/franc/Desktop/vip sheet";

for (let i =0; i< fileList.length; i++){
    convertXlsxToCsv(fileList[i], outputDir);
}