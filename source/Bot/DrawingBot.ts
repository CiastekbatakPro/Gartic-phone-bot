import {Bot} from "./Bot";
import {Drawer} from "./Drawer";

export class DrawingBot extends Bot {
    private drawer;
    private readonly topic;
    private readonly image: string;
    constructor(server: string, username: string, code: string, topic: string, image: string) {
        super(server, username, code);
        this.drawer = new Drawer(this.ws);
        this.topic = topic;
        this.image = image;
    }
    onChooseTopic(): void {
        this.setTopic(this.topic);
    }

    onRoundStart(round: number): void {
        console.log(round)
        this.drawer.draw(round, this.image);
    }
}
