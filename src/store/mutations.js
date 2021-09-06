export default {
    // addTodo(state, todo) {
    //     state.todos.push(todo)
    // },
    updateLoginInfo(state, data) {
        state.loginInfo = {
            token: data.token,
            server: data.server,
            username: data.username
        };
    },
    connect(state, val) {
        state.connected = val;
    }
};
