const fs = require('fs');
const path = require('path');

const { DateTime } = require('luxon');
const parse = require('csv-parse/lib/sync');
const PublicGoogleSheetsParser = require('public-google-sheets-parser');

const basePath = path.resolve(__dirname, '..');
//const csvPath = path.resolve(basePath, 'data', 'dealers.csv');
const csvPath = path.resolve(basePath, 'data', 'build.tab');
const dataJsPath = path.resolve(basePath, 'src', 'data.js');


const dayToDateOffset = {
    'wednesday': 0,
    'thursday': 1,
    'friday': 2,
    'saturday': 3,
    'sunday': 4,
    'monday': 5,
};

function writeData(dealers) {
    const dataStr = `export default ${JSON.stringify(dealers)};`;

    fs.writeFileSync(dataJsPath, dataStr);

    console.log(`Writing ${dataJsPath} complete`);
}

function tagsStrToArray(tagsStr) {
 if (tagsStr) {
     return tagsStr.split('||').map(sp => sp.trim()).filter(sp => sp.length > 0);
 }

 return [];
}


// Reminder: 2nd arg of new Date() is month INDEX
function getDateArgs(event) {
    const day = dayToDateOffset[event.day];

    //if (!event.Start) return [2025, 1, 20+day];
    if (event.time.length == 0) return [2025, 1, 19];

    const [hstr, mstr] = event.time.split(':');
    const addTwelve = (event.time.indexOf('PM') > 0) ? 12 : 0;
    const hours = parseInt(hstr) + addTwelve;
    const minutes = parseInt(mstr.split(' ')[0]);

    return [2025, 1, 19 + day, hours, minutes];
}


function formatSpeakers(hosts, guests) {
    /*
    if (!speakers) return [];

    return speakers.split('|').map(s => {
        const i = s.indexOf(':');

        return s.substr(i+1);
    });
    */
    if (guests) {
        return hosts.split(', ').concat(guests.split(', '));
    } else {
        return hosts.split(', ');
    }
}


function formatTime(dateObj, day, length) {
    const time = dateObj.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
    return `${day} @ ${time}, ${length} minutes`;
}


function handleDealers(dealers) {
    console.log(dealers[4]);
    transposedItems = dealers.map((item, index) => {
        newItem = {};
        //item.tags = tagsStrToArray(item.Track);
        newItem.tags = [item.category];
        newItem.Speakers = formatSpeakers(item.hosts, item.guests);
        newItem.dateArgs = getDateArgs(item);
        const dateObj = new Date(...newItem.dateArgs);
        newItem.Date = dateObj.toLocaleString('en-us', { weekday:"long" });
        newItem.Time = formatTime(dateObj, newItem.Date, item.length);
        newItem.key = `_event_${index}_`;
        newItem.Title = item.title;
        newItem.Room = item.room;
        newItem.Abstract = item.desc;

        return newItem;
    });

    writeData(transposedItems);
}


function processCsv() {
    console.log(`Making src/data.js via csv file: ${csvPath}`);
    const dealers_csv = fs.readFileSync(csvPath, {encoding: 'utf8'});

    const dealers = parse(dealers_csv, {delimiter: '\t', quote: false, relax_quotes: true, columns: true, skip_empty_lines: true});

    handleDealers(dealers);
}

function processGoogleSheet(spreadsheetId) {
    console.log(`Making src/data.js via Google Sheet Id: ${spreadsheetId}`);
    const parser = new PublicGoogleSheetsParser(spreadsheetId);

    parser.parse().then(handleDealers);

}

if (process.env.SPREADSHEET_ID) {
    processGoogleSheet(process.env.SPREADSHEET_ID);
} else {
    processCsv();
}
