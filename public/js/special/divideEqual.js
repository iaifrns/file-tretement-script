import fs from 'fs'
import { readSync } from 'fs'

const divider = () => {
    console.log("lskdjflsk")
    fs.readFile(inputFilePath, "utf8", (err, data) => {
        if(err) {
            console.log("An error read file ....", err)
            return
        }

        const dataArr = data.split('\n')

        const header = dataArr.shift()

        console.log(header)
    })
}

const inputFilePath = "C:/Users/franc/Desktop/vip sheet/New folder/data lead.csv"
const fileName  = "data lead.csv"
const outputDir = "C:/Users/franc/Desktop/vip sheet/New folder/"

divider()