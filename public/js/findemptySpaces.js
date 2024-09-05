import { readdirSync } from "fs";
import fs from "fs";
import path, { join } from "path";

const findEmptySpaces = () => {
  const files = getCsvFiles(folderName);

  files.forEach((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log("Error in the file: ", err.message);
        return;
      }
      const fileName = path.basename(file)

      const newData = removeRowsWithNoNumber(data)

      writeCSVFile(outputDir, newData, data.split('\n').shift(), fileName)
    });
  });
};

const removeRowsWithNoNumber = (data) => {
    const rows = data.split('\n')
    console.log(rows)

    const header = rows.shift().split(',')

    const newData = [];

    rows.forEach(row => {
        let count = 0
        const rowArr = row.split(',')
        const mainIndex = header.indexOf(headerToControlle[0])
        headerToControlle.forEach(name => {
            const index = header.indexOf(name)
            
            if(index != -1){
                if((rowArr[index] ?? "").length > 6 && (rowArr[index] ?? "").length < 16){
                    count++;
                    //rowArr[mainIndex] = rowArr[index]
                }
            }
        })
        if(count > 0){
            newData.push(row)
        }
    })

    return newData;

};

const writeCSVFile = (outputDir, data, header, finalFileName) => {
    if(!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, {recursive:true})
    }

    const finaleName = join(outputDir,"final-"+ finalFileName)
    const finalData = [header, ...data].join('\n')

    fs.writeFile(finaleName, finalData, (err) => {
        if(err){
            console.log("an Error occured writing the file", err)
            return
        }
        console.log("file written successfully ....")
    })
}

const getCsvFiles = (folder) => {
  const files = readdirSync(folder);

  let csvFile = files.filter(
    (fileName) => path.extname(fileName).toLowerCase() === ".csv"
  );
  csvFile = csvFile.map((fileName) => join(folder, fileName));
  return csvFile;
};

const folderName = "C:/Users/franc/Desktop/vip sheet/sheet 1/CNTE-20240206T105723Z-001/CNTE/csv/cc";
const outputDir = "C:/Users/franc/Desktop/vip sheet//sheet 1/CNTE-20240206T105723Z-001/CNTE/csv/done";

const headerToControlle = [
  /* "annonceur",
  "number-contact 2",
  "annonceur 2",
  "number-contact", */
  "telephone"
];

findEmptySpaces();
