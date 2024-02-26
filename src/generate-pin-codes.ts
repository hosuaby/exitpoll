import { nanoid } from 'nanoid'

const nbPinCodes = process.argv[2] as unknown as number;

for (let i = 0; i < nbPinCodes; i++) {
    const pin = nanoid(6);
    console.log(pin);
}