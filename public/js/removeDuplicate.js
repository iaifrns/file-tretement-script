import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

// Define the column to check for duplicates
const columnToCheck = 'annonceur'; // Replace with the actual column name

// Set up the paths
const inputFilePath = 'C:/Users/franc/Desktop/vip sheet/thermostat1 call list/thermostat1 call list1.csv'; // Replace with the path to your input CSV file
const outputFilePath = 'C:/Users/franc/Desktop/vip sheet/thermostat1 call list/thermostat1 call list1 v.csv'; // Path for the output CSV file

// Set up the CSV writer
const csvWriter = createCsvWriter({
    path: outputFilePath,
    header: [
        // Add your column headers here
        /* {id: 'LIBELLE TITRE CIVILITE', title: 'LIBELLE TITRE CIVILITE'}, // Replace with actual column names
        {id: 'NOM DU CLIENT', title: 'NOM DU CLIENT'}, // Replace with actual column names
        {id: 'PRENOM DU CLIENT', title: 'PRENOM DU CLIENT'}, // Replace with actual column names
        {id: 'EMAIL', title: 'EMAIL'}, // Replace with actual column names
        {id: 'LIBELLE DE LA VOIE', title: 'LIBELLE DE LA VOIE'}, // Replace with actual column names
        {id: 'VILLE', title: 'VILLE'}, // Replace with actual column names
        {id: 'CODE POSTAL', title: 'CODE POSTAL'},
        {id: 'NUMERO DE TELEPHONE CONTACT', title: 'NUMERO DE TELEPHONE CONTACT'},
        {id: 'NUMERO DE TELEPHONE CONTACT2', title: 'NUMERO DE TELEPHONE CONTACT'},
        {id: 'Telephone', title: 'Telephone'}, */
        {id: 'bi-denomination', title: 'bi-denomination'}, // Replace with actual column names
        {id: 'pj-lb', title: 'pj-lb'}, // Replace with actual column names
        {id: 'bi-description', title: 'bi-description'},
        {id: 'annonceur', title: 'annonceur'},
        // Add as many as you need
    ]
});

const seen = new Set();
const rows = [];

fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', (row) => {
        const cellValue = row[columnToCheck];
        if (!seen.has(cellValue)) {
            seen.add(cellValue);
            rows.push(row);
        }else{
            console.log(cellValue)
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
