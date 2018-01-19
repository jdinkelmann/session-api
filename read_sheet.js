'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./credentials');


let sheetDetails = {};

const spreadsheet = new GoogleSpreadsheet('1SdDHmeYeL2sZz6QqNybtU9X2JceG40iD8K-Rp-Dt104'); // Sheet ID (visible in URL)
spreadsheet.useServiceAccountAuth(creds,(error) => {
    spreadsheet.getRows(1, function (err, rows) {
            sheetDetails = rows;
    });
})

// spreadsheet.getInfo((sheetError, info) => {
//     if (sheetError) {
//         console.error(sheetError);

//         return sheetError;
//     }

//     const sheet = info.worksheets[0];

//     const rowOptions = {
//         limit: 100000,
//         offset: 0
//     }

//     return sheet.getRows(rowOptions, (rowsError, rows) => {
//         if (rowsError) {
//             console.error(rowsError);

//             return rowsError;
//         }

//         return console.log(rows);
//     });
// });