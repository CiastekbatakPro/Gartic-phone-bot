import WebSocket from "ws";
import Jimp from "jimp";
import rgbHex from "rgb-hex";
export class Drawer {
    private ws: WebSocket;
    constructor(ws: WebSocket) {
        this.ws = ws
    }
    async draw(turnNum: number, selected: string) {
        console.log(turnNum)
        console.log(selected)
        await Jimp.read(`${__dirname}/../resized/${selected}`, (err, img) => {
            console.time("drawing time");
            for(let y = 0; y < 450; y++) {
                for(let x = 0; x < 800; x++) {
                    const color = Jimp.intToRGBA(img.getPixelColor(x,y));
                    this.ws.send(42 + JSON.stringify([2,7,{"t":turnNum,"v":[1,[`#${rgbHex(color.r, color.g, color.b)}`,6,1],[x,y]]}]))
                }
            }
            console.timeEnd("drawing time");
            setTimeout(() => {
                this.ws.send(42 + JSON.stringify([2,15,true]));
            }, 5000)
        });
    }
}
