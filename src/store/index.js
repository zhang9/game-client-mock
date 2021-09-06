import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import plugins from "./plugins";

export default createStore({
    state: {
        loginInfo: null,
        connected: false
    },
    actions,
    mutations,
    plugins
});
