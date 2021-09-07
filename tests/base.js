const accountApis = require("../src/apis/account");
const ws = require("../src/utils/ws");

export function initData() {
    return accountApis
        .getAllGameServers()
        .then(res => {
            return res.find(v => (v.id = 1));
        })
        .then(server => {
            ws.connect(server.host + ":" + server.port);
        });
}
