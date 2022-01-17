import {readFileSync} from "fs";
import axios from "axios";

export function getRandomName() {
    const userList = readFileSync(__dirname + "/../userzy.txt", "utf8").split(',');
    return userList[Math.floor(Math.random() * userList.length)];
}
export async function getServerFromCode(code: string) {
    const { data } = await axios.get(`https://garticphone.com/api/server?code=${code}`)
    return data;
}
