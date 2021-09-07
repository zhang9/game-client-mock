import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import plugins from "./plugins";

export default createStore({
    state: {
        c2s: null,
        s2c: null,
        config: null,
        loginInfo: null,
        connected: false
    },
    actions,
    mutations,
    plugins
});
