import * as readline from 'readline';
import {existsSync, mkdirSync, writeFile} from 'fs';
import * as QRCode from 'qrcode'
import * as path from 'path';
import {Eta} from 'eta';
import {chunk} from 'lodash';

const baseDir = path.join(__dirname, '..');
const outDir = path.join(__dirname, '..', 'out');

const baseUrl = process.argv[2];
const queryParam = process.argv[3] || 'pin';
const pngOutDirName = process.argv[4] || 'png';
const pageFileName = process.argv[5] || 'page.html';

const pngOutDir = path.join(outDir, pngOutDirName);
if (!existsSync(pngOutDir)) {
    mkdirSync(pngOutDir);
}

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const eta = new Eta({ views: baseDir });

const pinImages: string[] = [];

r1.on('line', async (pin: string) => {
    const url = new URL(baseUrl);
    url.searchParams.append(queryParam, pin);
    const fullUrl = url.href;

    QRCode.toString(fullUrl, { type: 'terminal' }, (err, url) => {
        console.log(url)
    });

    const pinImageFile = `${pngOutDir}/${pin}.png`;
    pinImages.push(`../${pngOutDirName}/${pin}.png`);

    await QRCode.toFile(pinImageFile, fullUrl);
});

r1.on('close', () => {
    const imgLinks = chunk(pinImages, 4);
    const res = eta.render('./qr', { imgLinks})

    const pageFile = path.join(outDir, 'pages', pageFileName);
    writeFile(pageFile, res, () => {});
});