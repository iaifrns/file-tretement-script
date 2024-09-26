import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

// Define the column to check for duplicates
const columnToCheck = 'annonceur'; // Replace with the actual column name

// Set up the pathssheet 1\xx\csv
const inputFilePath = 'C:/Users/franc/Desktop/vip sheet/done3/autre.csv'; // Replace with the path to your input CSV file
const outputFilePath = 'C:/Users/franc/Desktop/vip sheet/filevip/xx/done/final-thermostat1 list final 2.csv'; // Path for the output CSV file

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
        /* {id: 'NOM DU CLIENT', title: 'NOM DU CLIENT'},
        {id: 'PRENOM DU CLIENT', title: 'PRENOM DU CLIENT'},
        {id: 'EMAIL', title: 'EMAIL'},
        {id: 'ADRESSE', title: 'ADRESSE'},
        {id: 'VILLE', title: 'VILLE'},
        {id: 'CODE POSTAL', title: 'CODE POSTAL'},
        {id: 'TELEPHONE', title: 'TELEPHONE'}, */
       /*  {id: 'id', title: 'id'},
        {id: 'code_postal', title: 'code_postal'},
        {id: 'ville', title: 'ville'},
        {id: 'adresse', title: 'adresse'},
        {id: 'genre', title: 'genre'},
        {id: 'nom', title: 'nom'},
        {id: 'prenom', title: 'prenom'},
        {id: 'mobile', title: 'mobile'},
        {id: 'tel3', title: 'tel3'},
        {id: 'fax', title: 'fax'},
        {id: 'age_moyen', title: 'age_moyen'},
        {id: 'ethnie', title: 'ethnie'},
        {id: 'tel1_prospection', title: 'tel1_prospection'},
        {id: 'tel2_prospection', title: 'tel2_prospection'},
        {id: 'tel3_prospection', title: 'tel3_prospection'},
        {id: 'mobile_prospection', title: 'mobile_prospection'},
        {id: 'fax_prospection', title: 'fax_prospection'}, */
        // Add as many as you need
    ],
    fieldDelimiter: ';'
});													


const seen = new Set();
const rows = [];

fs.createReadStream(inputFilePath)
    .pipe(csv({separator: ';'}))
    .on('data', (row) => {
        const cellValue = row[columnToCheck];
        if (!seen.has(cellValue)) {
            seen.add(cellValue);
            rows.push(row);
        }else{
            //console.log(cellValue, columnToCheck)
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
