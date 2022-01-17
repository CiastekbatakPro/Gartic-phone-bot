import Jimp from 'jimp';
import fs from 'fs';

export function getImages(dir: string) {
    return fs.readdirSync(dir);
}
export function getNewImages() {
    return getImages(`${__dirname}/../images`);
}
export function getConvertedImages() {
    return getImages(`${__dirname}/../resized`);
}
export function resizeImage(x: number, y: number, dir: string, name: string) {
    Jimp.read(dir + "/" + name, (err, img) => {
        img.resize(x,y)
        img.write(`${__dirname}/../resized/${name}`)
    });
}
export function convertImages() {
    const files = getNewImages();
    for(let image of files) {
        resizeImage(800, 450, `${__dirname}/../images`, image)
        fs.rmSync(`${__dirname}/../images/${image}`)
        console.log(`Converted ${image}`)
    }
}
