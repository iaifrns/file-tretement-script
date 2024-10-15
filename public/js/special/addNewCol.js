import fs, {readdirSync} from "fs";
import path, { join } from "path";
import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";

const inputFilePath =
  "C:/Users/franc/Desktop/vip sheet/thermostat file 1/bon departement1"; // Replace with your CSV file path
const outputDir = "C:/Users/franc/Desktop/vip sheet/thermostat file 1/bon departement1/done"; // Directory to save the split CSV files

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const columnToSplit1 = [7]; // Column name or index to split by (e.g., 'G' or 6 for column G)
const columnToSplit2 = [8]; // Column name or index to split by (e.g., 'G' or 6 for column G)


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

  return str1.replace('\r','');
};

function getCsvFiles(folderName) {
  const files = readdirSync(folderName);

  const csvFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".csv"
  );

  const csvFilePaths = csvFiles.map((file) => path.join(folderName, file));

  return csvFilePaths;
}

const files =  getCsvFiles(inputFilePath)

const processFile = (file, i) => {
  return new Promise((resolve, reject) => {
    const datas = [];
    let header;
    const s = (i == 0) ? ";" : ','
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log("Could not open the file sorry", err);
        resolve(err)
        return;
      }
      const dataTable = data.split("\n");
      const header1 = dataTable.shift();
  
      const s = header1.split(";").length > 2 ? ";" : ",";

      const header = [...header1.split(s),"Tel"]
  
      dataTable.forEach((row) => {
        const values = row.split(s)
        const copyVal = [...values.slice(0,values.length-1)]
        const column1 = (values[columnToSplit1[i]] ?? "   ").slice(0, 3);
        const column2 = (values[columnToSplit2[i]] ?? "   ").slice(0, 3);

        const lastNum = FilterNum(
          column1,
          column2,
          values[columnToSplit1[i]],
          values[columnToSplit2[i]]
        );
        datas.push([...copyVal, values[values.length-1].replace('\r', ''), lastNum].join(s));
      });
      writeCSVFile(header.join(s).replace('\r',''), datas, path.basename(file));
      resolve();
    });
    /* fs.createReadStream(file)
      .pipe(csvParser({ separator: s }))
      .on("headers", (headers) => {
        // Store the index of the column to split by
        header = [...headers, "Tel"];
      })
      .on("data", (row) => {
        const values = Object.values(row);
        console.log(values)

        const column1 = (values[columnToSplit1[i]] ?? "   ").slice(0, 3);
        const column2 = (values[columnToSplit2[i]] ?? "   ").slice(0, 3);

        const lastNum = FilterNum(
          column1,
          column2,
          values[columnToSplit1[i]],
          values[columnToSplit2[i]]
        );
        console.log(values,lastNum,i,s)
        data.push([...values, lastNum]);
      })
      .on("end", () => {
        // Create separate CSV files for each unique prefix
        console.log(data, i);
        // writeCSVFile(header, data);
        resolve(); // Resolve the promise once the stream is done
      })
      .on("error", (err) => {
        reject(err); // Reject the promise if there is an error
      }); */
  });
};

const processFiles = async (files) => {
  for (let i = 0; i < files.length; i++) {
    try {
      await processFile(files[i], i); // Await the processing of each file
    } catch (err) {
      console.error(`Error processing file ${files[i]}:`, err);
    }
  }

};

// Start processing the files
processFiles(files);

const writeCSVFile = (header, data, file) => {
  const dataTable = [header, ...data].join("\n");
  const name = join(outputDir, file );

  fs.writeFile(name, dataTable, (err) => {
    if (err) {
      console.log("failed ....", err);
      return;
    }
    console.log("success ....");
  });
};


