const accountApis = require("../src/apis/account");
const ws = require("../src/utils/ws");

export function connect() {
    return accountApis
        .getAllGameServers()
        .then(res => {
            return res.find(v => (v.id = 1));
        })
        .then(server => {
            return ws.connect(server.host + ":" + server.port);
        });
}

export function close() {
    return ws.close();
}
