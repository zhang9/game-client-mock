<template>
    <a-layout>
        <app-header />
        <a-layout>
            <app-sider />
            <a-layout-content class="main-window">
                Content

                <button @click="entry">entry coop</button>
                <button @click="attack">attack boos</button>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppSider from "./components/Sider.vue";
import { send } from "./utils/ws";
export default {
    name: "App",
    components: {
        AppHeader,
        AppSider
    },
    setup() {
        // connect();
        // getLoginToken().then(res => {
        //     console.log(res);
        //     setTimeout(() => {
        //         send("verify_token", { token: res.token });
        //     }, 1000);
        // });

        const entry = () => {
                send("pve_enter_coop");
            },
            attack = () => {
                send("pve_coop_boss", { underlingid: "30" });
            };

        return {
            entry,
            attack
        };
    }
};
</script>

<style lang="less">
#app {
    display: flex;
    min-height: 100vh;
    .main-window {
        background-color: @white;
    }
}
</style>
