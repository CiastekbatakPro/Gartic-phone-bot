import {getRandomName, getServerFromCode} from "./Bot/Utils";
import { convertImages } from './Bot/Image'
import {DrawingBot} from "./Bot/DrawingBot";
const code = "2603ed34a";
const selected = "matrix.jpg";
const topic = "Ciastekbatak ale to wcale nie on.";
const botCount = 3;
const bots: DrawingBot[] = [];
(async () => {
    convertImages()
    for(let i = 0; i < botCount; i++) {
        const bot = new DrawingBot(await getServerFromCode(code), getRandomName(), code, topic, selected);
        bots.push(bot);
    }
})();