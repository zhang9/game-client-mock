import * as accountApis from "../utils/account-apis";
import { close, connect, send } from "../utils/ws";

export default {
    // addTodo({ commit }, text) {
    //     commit('addTodo', {
    //         text,
    //         done: false
    //     })
    // },
    login({ commit }, data) {
        return accountApis.login(data).then(res => {
            connect(res.server.host + ":" + res.server.port);
            commit("updateLoginInfo", {
                token: res.token,
                username: data.username,
                server: res.server
            });
        });
    },
    verifyToken({ state }) {
        return new Promise(resolve => {
            send("verify_token", { token: state.loginInfo.token }, data => {
                resolve(data);
            });
        });
    },
    logout() {
        close();
    }
};
