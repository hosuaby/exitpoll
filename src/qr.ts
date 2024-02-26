import * as readline from 'readline';
import {existsSync, mkdirSync, writeFile} from 'fs';
import {buildUrl} from 'build-url-ts';
import * as QRCode from 'qrcode'
import * as path from 'path';
import {Eta} from 'eta';
import {chunk} from 'lodash';

const baseUrl = process.argv[2];
const queryParam = process.argv[3] || 'pin';

const baseDir = path.join(__dirname, '..');
const outFolderName = 'out';
const outFolder = path.join(baseDir, outFolderName);

if (!existsSync(outFolder)) {
    mkdirSync(outFolder);
}

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const eta = new Eta({ views: baseDir });

const pinImages: string[] = [];

r1.on('line', async (pin: string) => {
    const fullUrl = buildUrl(baseUrl, {
        queryParams: {
            [queryParam]: pin,
        }
    }) as string;

    QRCode.toString(fullUrl, { type: 'terminal' }, (err, url) => {
        console.log(url)
    });

    const pinImageFile = `${outFolder}/${pin}.png`;
    pinImages.push(`${outFolderName}/${pin}.png`);

    await QRCode.toFile(pinImageFile, fullUrl);
});

r1.on('close', () => {
    const imgLinks = chunk(pinImages, 5);
    const res = eta.render('./qr', { imgLinks})

    writeFile(path.join(baseDir, 'page.html'), res, () => {});
});