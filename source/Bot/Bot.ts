import WebSocket from "ws";
import { red, green, blue} from 'chalk';
import {v4 as uuid} from "uuid";

export abstract class Bot {
    protected ws: WebSocket;
    protected username: string;
    protected code: string;
    protected constructor(server: string, username: string, code: string) {
        this.ws = new WebSocket(server + "/socket.io/?EIO=4&transport=websocket", {origin: "https://garticphone.com/"})
        this.ws.on('message', (msg: string) => this.onMessage(msg));
        this.ws.on('close', () => console.log("CLOSED"));;
        this.code = code;
        this.username = username;
    }
    private onMessage(message: string): void {
        try { // 😎 super fix
            if (message[0] == "0") return this.ws.send(40);
            if (message === "2") return this.onPing();
            if(message.startsWith("40")) return this.join(this.username, this.code);
            const data = JSON.parse(message.substring(2));
            if (data[0] !== 2 || data[1] !== 11) return;
            if(data[2]?.previous?.data == null) {
                console.log(data[0])
                console.log(data[1])
                return this.onChooseTopic();
            }
            if(data[2].turnNum === null) return;
            console.log(data);
            return this.onRoundStart(data[2].turnNum);
        } catch (e) {
            console.log("hello errorino here")
        }
    }
    protected setTopic(topic: string) {
        this.send([2,6,{"t":0,"v":topic}]);
        setTimeout(() => this.send([2,15,true]), 3 * 1000)
    }
    protected join(nickname: string, code: string): void {
        this.send([1,uuid(),nickname, Math.floor(Math.random() * 30),"en",false, code]);
    }
    protected send(msg: any): void {
        const toSend = "42" + JSON.stringify(msg);
        console.log(green(toSend));
        this.ws.send(toSend);
    }
    protected onPing(): void {
        console.log('received ping')
        return this.ws.send(3)
    }
    abstract onChooseTopic(): void;
    abstract onRoundStart(round: number): void;
}
