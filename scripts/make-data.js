const fs = require('fs');
const path = require('path');

const parse = require('csv-parse/lib/sync');
const PublicGoogleSheetsParser = require('public-google-sheets-parser');

const basePath = path.resolve(__dirname, '..');
const csvPath = path.resolve(basePath, 'data', 'dealers.csv');
const dataJsPath = path.resolve(basePath, 'src', 'data.js');


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


function formatDate(event) {
  const day = parseInt(event.Day);

  if (!event.Start) return new Date(2024, 2, 20 + day);

  const [hstr, mstr] = event.Start.split(':');
  const hours = parseInt(hstr);
  const minutes = parseInt(mstr);

  return new Date(2024, 2, 20 + day, hours, minutes);
}


function formatSpeakers(speakers) {
  if (!speakers) return [];

  return speakers.split('|').map(s => {
    const i = s.indexOf(':');

    return s.substr(i+1);
  });
}


function formatTime(event) {
  let duration = '';

  if (event.Duration) {
    duration = `, Length ${event.Duration}`;
  }

  return `${event.Date} @ ${event.Start}${duration}`;
}


function formatDateTime(event) {
}


function handleDealers(dealers) {
  console.log(dealers[0]);
  dealers.forEach((item, index) => {
    item.tags = tagsStrToArray(item.Track);
    item.Speakers = formatSpeakers(item.Speakers);
    item.dateObj = formatDate(item);
    item.Date = item.dateObj.toLocaleString('en-us', { weekday:"long" });
    item.Time = formatTime(item);
    item.key = `_event_${index}_`;
  });

  writeData(dealers);
}


function processCsv() {
  console.log(`Making src/data.js via csv file: ${csvPath}`);
  const dealers_csv = fs.readFileSync(csvPath, {encoding: 'utf8'});

  const dealers = parse(dealers_csv, {columns: true, skip_empty_lines: true});

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
