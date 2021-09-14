import { createLogger } from "vuex";

// const localStoragePlugin = store => {
//     // store.subscribe((mutation, { todos }) => {
//     //     window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
//     // })
// };

const localStoragePlugin = () => {};

export default process.env.NODE_ENV !== "production"
    ? [createLogger(), localStoragePlugin]
    : [localStoragePlugin];
