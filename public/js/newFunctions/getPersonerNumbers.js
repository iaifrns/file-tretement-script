import fs from "fs";

const filterNumbers = () => {
  fs.readFile(csvFilePath, "utf8", (err, data) => {
    if (err) {
      console.log("An error occured while opening the file", err);
      return;
    }
    const rows = data.split('\n')
    const header = rows.shift().split(';')

    const newData = []

    const mainIndex = header.indexOf(headerWithNumbers[0])

    rows.forEach(row => {
        const arrRow = row.split(';')
        let number = ""
        headerWithNumbers.forEach(name => {
            const index = header.indexOf(name)
            const num = (arrRow[index] ?? "").length
            if(num > 8 && num < 15){
                number = arrRow[index]
                if(number.slice(0,2) == '06' || number.slice(0,2) == '07'){
                    return
                }
            }
        })
        arrRow[mainIndex] = number;
        newData.push(arrRow.slice(0, mainIndex+1).join(';'))
    })

    writeCSVFile(finalCsvFilePath, header, newData, mainIndex)
  });
};

const writeCSVFile = (finalPath, header, data, index) =>{
    const finalData = [header.slice(0, index+1).join(";"), ...data].join('\n')

    console.log(finalData)

    fs.writeFile(finalPath, finalData, (err)=>{
        if(err) {
            console.log("Failed to create file", err)
            return
        }
        console.log("success ....")
    })
    
}

const headerWithNumbers = [
  "annonceur",
  "number-contact 2",
  "annonceur 2",
  "number-contact",
];

const csvFilePath =
  "C:/Users/franc/Desktop/vip sheet/thermostat1 done/final-Thermostat1 done1.csv";
const finalCsvFilePath =
  "C:/Users/franc/Desktop/vip sheet/thermostat1 done/final1-Thermostat1 done1.csv";

filterNumbers();
