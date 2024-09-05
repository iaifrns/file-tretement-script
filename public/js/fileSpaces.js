import fs from "fs";
import path from "path";
import { readdirSync } from "fs";

// Function to merge two columns
function mergeColumns(csvData, col1Index, col2Index) {
  const rows = csvData.split("\n");

  // Merging process
  const mergedRows = rows.map((row, index) => {
    const columns = row.split(",");
    
    // If col1 is empty, use col2; otherwise, use col1
    columns[col1Index] = ((columns[col1Index] ?? '').toString().length > 5) ? columns[col1Index] : columns[col2Index];
    
    columns.pop();

    return columns.join(",");
  });

  return mergedRows.join("\n");
}

// Function to read, merge, and write CSV
function mergeCSVColumns(
  filePath,
  col1Index,
  col2Index,
  outputDir,
  outputFileName
) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const mergedCSV = mergeColumns(data, col1Index, col2Index);

    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFilePath = path.join(outputDir, outputFileName);

    fs.writeFile(outputFilePath, mergedCSV, (err) => {
      if (err) {
        console.error("Error writing the file:", err);
        return;
      }

      console.log("File written successfully to", outputFilePath);
    });
  });
}

// Usage Example
const outputDirectory =
  "C:/Users/franc/Desktop/vip sheet/data";
const folderName =
  "C:/Users/franc/Desktop/vip sheet";
const col1Index = 7; // Index for column 8 (0-based)
const col2Index = 8; // Index for column 9 (0-based)

function getCsvFiles(folderName) {
  const files = readdirSync(folderName);

  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv"
  );

  const csvFilePaths = csvFiles.map((file) => path.join(folderName, file));

  return csvFilePaths;
}

const fileNames = getCsvFiles(folderName);

fileNames.map((fileName) => {
  const outputFileName = path.basename(fileName);
  mergeCSVColumns(
    fileName,
    col1Index,
    col2Index,
    outputDirectory,
    outputFileName
  );
});
