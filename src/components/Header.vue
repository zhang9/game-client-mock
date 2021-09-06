<template>
    <a-layout-header class="header">
        <h1>Game Client Mock</h1>
        <a-form
            layout="inline"
            :model="params"
            @finish="login"
            v-if="!connected"
        >
            <a-form-item>
                <a-select
                    v-model:value="params.serverId"
                    style="width: 240px"
                    placeholder="Game Server"
                >
                    <a-select-option
                        :key="item.id"
                        v-for="item in servers"
                        :value="item.id"
                    >
                        {{
                            item.name + "(" + item.host + ":" + item.port + ")"
                        }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-input v-model:value="params.username" placeholder="Username">
                    <template #prefix>
                        <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-button
                    html-type="submit"
                    :disabled="params.username === '' || params.server === ''"
                >
                    Log in
                </a-button>
            </a-form-item>
        </a-form>
        <a-button @click="logout" v-else>
            {{
                loginInfo.username +
                "@" +
                loginInfo.server.host +
                ":" +
                loginInfo.server.port
            }}
            <PoweroffOutlined />
        </a-button>
    </a-layout-header>
</template>
<script>
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons-vue";
import { computed, defineComponent, reactive } from "vue";
import { getAllGameServers } from "../utils/account-apis";
import { useStore } from "vuex";
export default defineComponent({
    setup() {
        const store = useStore();
        const params = reactive({
            serverId: undefined,
            username: ""
        });

        const login = () => store.dispatch("login", params);
        const logout = () => store.dispatch("logout");

        const servers = reactive([]);
        getAllGameServers().then(res => {
            servers.push(...res);
        });

        return {
            params,
            login,
            logout,
            servers,
            loginInfo: computed(() => store.state.loginInfo),
            connected: computed(() => store.state.connected)
        };
    },

    components: {
        UserOutlined,
        PoweroffOutlined
    }
});
</script>
<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
        margin: 0;
        color: @blue-10;
    }
}
</style>
