import axios from "axios";

const ins = axios.create({
    baseURL: process.env.VUE_APP_ACCOUNT_SERVER,
    headers: {
        "Content-Type": "application/json"
    }
});

export function login(data) {
    return ins
        .post("/login", {
            isDev: true,
            sdk: "debug",
            code: data.username,
            res_version: "1.0.1",
            server: data.serverId,
            device_os: "Windows PC"
        })
        .then(res => {
            return res.data;
        });
}

export function getAllGameServers() {
    return ins.get("/all-game-server").then(res => {
        return res.data;
    });
}
