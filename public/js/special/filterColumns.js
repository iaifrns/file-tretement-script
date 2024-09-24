import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

// Define the column to check for duplicates

// Set up the pathssheet 1\xx\csv
const inputFilePath = 'C:/Users/franc/Desktop/vip sheet/leads depart 40.csv'; // Replace with the path to your input CSV file
const outputFilePath = 'C:/Users/franc/Desktop/vip sheet/final-leads depart 40.csv'; // Path for the output CSV file

// Set up the CSV writer
const csvWriter = createCsvWriter({
    path: outputFilePath,
    header: [
        // Add your column headers here
        {id: 'NOM', title: 'NOM'}, // Replace with actual column names
        {id: 'Prenom', title: 'Prenom'}, // Replace with actual column names
        {id: 'Civilite', title: 'Civilite'},
        {id: 'VILLE', title: 'VILLE'},
        {id: 'Code Postal', title: 'Code Postal'},
        {id: 'Adresse', title: 'Adresse'},
        {id: 'N° Telephone', title: 'N° Telephone'},
        {id: 'Email', title: 'Email'},
        {id: 'Date de Naissance', title: 'Date de Naissance'},
    ],
    fieldDelimiter: ','
});

const rows = [];

fs.createReadStream(inputFilePath)
    .pipe(csv({separator: ','}))
    .on('data', (row) => {
        const num = (row['N° Telephone'] ?? " ").trim()
        if(num.slice(0,1) == '6' || num.slice(0,1) == '7'){
            rows.push(row)
        }
    })
    .on('end', () => {
        console.log(rows)
        csvWriter.writeRecords(rows)
            .then(() => {
                console.log('Duplicates removed and data saved to', outputFilePath);
            })
            .catch(err => console.error('Error writing CSV file:', err));
    });
