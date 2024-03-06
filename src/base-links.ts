import {readFileSync} from 'fs';
import * as path from 'path';

// pin param: entry.1240140900
const urlTemplate = 'https://docs.google.com/forms/d/e/1FAIpQLSdfcwMhj16u1bMGaVQ4ychsgGj2NyYCu2RieHKBwGB52-6WJg/viewform?usp=pp_url&entry.915820216=${code}&entry.1939325063=${city}';

const bureauxFile = path.join(__dirname, '..', 'data', 'bureaux.csv');
const allFileContents = readFileSync(bureauxFile, 'utf-8');

allFileContents.split(/\r?\n/).forEach(line => {
    const [code, city] = line.split(',');
    let link = urlTemplate
        .replace('${code}', code)
        .replace('${city}', city);
    link = encodeURI(link);

    console.log(`${code},${city},${link}`);
});