export default {
    updateRoute(state, data) {
        state.c2s = data.c2s;
        state.s2c = data.s2c;
        console.log(data);
    },
    updateLoginInfo(state, data) {
        state.loginInfo = {
            token: data.token,
            server: data.server,
            username: data.username
        };
    },
    updateConfig(state, config) {
        state.config = config;
    },
    connect(state, val) {
        state.connected = val;
    }
};
