import pako from "pako";
import { array2arraybuffer } from "./utils";
import clientSerder, { clientHost } from "./sender";
import store from "../store";

let ws,
    session = 1,
    leftBuffer,
    callbacks = {},
    handlers = {};

function unpackPacket(buff) {
    //b1判断是否需要解压缩
    if (!buff || buff.length < 3) {
        return buff;
    }

    const b1 = buff[0];
    const b2 = buff[1];
    const b3 = buff[2];
    if (b1 == 0) {
        const length = b2 * 256 + b3;
        // return length + 3;
        return buff;
    } else if (b1 == 1) {
        //解压缩
        let newbuff = buff.subarray(3);
        let decompress = pako.inflate(newbuff);
        var newDecompress = new Uint8Array(decompress.length + 3);
        let firstArray = buff.subarray(0, 3);
        newDecompress.set(firstArray);
        newDecompress.set(decompress, firstArray.length);
        return newDecompress;
        // return newDecompress.length;
    }
}

export function connect(server) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        return;
    }
    console.log(server);
    ws = new WebSocket(`ws://${server}`);
    ws.addEventListener("open", event => {
        console.log(event);
        store.commit("connect", true);
        store.dispatch("verifyToken");
    });
    ws.addEventListener("message", event => {
        event.data.arrayBuffer().then(res => {
            const array = new Uint8Array(res);
            const newArray = unpackPacket(array);
            const content = clientHost.dispatch(newArray.subarray(3));

            console.log("first", content);
            if (content.type == "RESPONSE") {
                const callback = callbacks[content.session];
                if (callback) {
                    try {
                        callback(content.result);
                    } catch (error) {
                        console.log(error);
                    }
                    delete callbacks[content.session];
                }
            } else if (content.type == "REQUEST") {
                const handler = handlers[content.pname];
                if (handler) {
                    handler(content.result);
                } else {
                    console.warn(
                        "未处理的S2C请求 id:",
                        content.pname,
                        "content:",
                        content.result
                    );
                }
            }
        });
    });
    ws.addEventListener("close", event => {
        console.log(event);
        store.commit("connect", false);
    });
}

export function send(name, data, callback) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        throw new Error("websocket is not ready!");
    }
    const array = clientSerder(name, data, session);
    const buffer = array2arraybuffer(array);
    ws.send(buffer);
    if (callback) {
        callbacks[session] = callback;
    }
    session++;
}

export function close() {
    ws.close(1000);
}