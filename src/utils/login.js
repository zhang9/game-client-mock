import axios from "axios";

export async function getLoginToken() {
    let loginRes = null;
    await axios({
        url: "http://127.0.0.1:13200/login",
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            isDev: true,
            sdk: "debug",
            code: "ttt",
            res_version: "1.0.1",
            server: 101,
            device_os: "Windows PC"
        }

    }).then(res => {
        console.log(res.data)
        loginRes = res.data;
    })
    return loginRes;
}