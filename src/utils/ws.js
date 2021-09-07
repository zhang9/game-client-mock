import pako from "pako";
import { array2arraybuffer } from "./utils";
import clientSerder, { clientHost } from "./sender";

let ws,
    session = 1,
    closeCallback,
    callbacks = {},
    handlers = {};

function unpackPacket(buff) {
    if (!buff || buff.length < 3) {
        return buff;
    }
    const b1 = buff[0];
    if (b1 == 0) {
        return buff;
    } else if (b1 == 1) {
        //zlip decompress
        const newbuff = buff.subarray(3);
        const decompress = pako.inflate(newbuff);
        const newDecompress = new Uint8Array(decompress.length + 3);
        const firstArray = buff.subarray(0, 3);
        newDecompress.set(firstArray);
        newDecompress.set(decompress, firstArray.length);
        return newDecompress;
    }
}

function onMessage(event) {
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
}
function onClose(event) {
    unbindEvent();
    ws = null;
    if (closeCallback) {
        closeCallback(event);
    }
}

function bindEvent() {
    ws.addEventListener("message", onMessage);
    ws.addEventListener("close", onClose);
}
function unbindEvent() {
    ws.removeEventListener("message", onMessage);
    ws.removeEventListener("close", onClose);
}

function __connect(server, callback) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        return;
    }
    ws = new WebSocket(`ws://${server}`);
    ws.addEventListener("open", event => {
        bindEvent();
        if (callback) {
            callback(event);
        }
    });
}

export function connect(server) {
    return new Promise(resolve => {
        __connect(server, event => {
            resolve(event);
        });
    });
}

function __send(name, data, callback) {
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

export function send(name, data) {
    return new Promise(resolve => {
        __send(name, data, res => {
            resolve(res);
        });
    });
}

function __close(code, callback) {
    closeCallback = callback;
    ws.close(code);
}

export function close(code = 10000) {
    return new Promise(resolve => {
        __close(code, res => {
            resolve(res);
        });
    });
}
