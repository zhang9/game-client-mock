import * as accountApis from "../apis/account";
import * as loginApis from "../apis/login";
import { close, connect } from "../utils/ws";

export default {
    logout({ commit }) {
        return close().then(() => {
            commit("connect", false);
        });
    },
    login({ commit, dispatch }, data) {
        return accountApis
            .login(data)
            .then(res => {
                commit("updateLoginInfo", {
                    token: res.token,
                    username: data.username,
                    server: res.server
                });
                return connect(res.server.host + ":" + res.server.port);
            })
            .then(() => {
                commit("connect", true);
                dispatch("verifyToken");
            });
    },
    getAllConfig({ commit }) {
        return accountApis.getAllConfig().then(res => {
            commit("updateConfig", res);
        });
    },
    verifyToken({ state }) {
        return loginApis.verifyToken(state.loginInfo.token);
    }
};
