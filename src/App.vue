<template>
    <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout>
            <a-layout-sider>Sider</a-layout-sider>
            <a-layout-content>Content</a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import clientSender from "./utils/transform";
import { getLoginToken } from "./utils/login";
import { array2arraybuffer } from './utils/utils';
export default {
    name: "App",
    setup() {
        getLoginToken().then(res => {
            console.log(res);
            const buffer = clientSender(
                "verify_token",
                { token: res.token },
                1
            );
            console.log(buffer instanceof Array, buffer);
            const ws = new WebSocket("ws://127.0.0.1:10011");
            ws.addEventListener("open", () => {
                ws.send(array2arraybuffer(buffer));
            });
        });
    }
};
</script>

<style lang="less">
#app {
    display: flex;
    min-height: 100vh;
}
</style>
