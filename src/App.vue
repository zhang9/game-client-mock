<template>
    <a-layout>
        <app-header />
        <a-layout class="main-wrap" v-show="connected">
            <app-sider @function-select="onFunctionSelect" />
            <a-layout-content class="main-window">
                <div class="request-wrap" v-if="requestInfo && requestInfo.key">
                    <a-card :title="requestInfo.key + ': request'">
                        <pre>{{ requestInfo.request }}</pre>
                    </a-card>
                    <a-card :title="requestInfo.key + ': response'">
                        <pre>{{ requestInfo.response }}</pre>
                    </a-card>
                    <a-card title="send request">
                        <a-form
                            :model="params"
                            layout="vertical"
                            class="request-form"
                        >
                            <a-form-item label="request name">
                                <a-input
                                    :disabled="true"
                                    v-model:value="params.name"
                                />
                            </a-form-item>
                            <a-form-item label="request body">
                                <a-textarea
                                    v-model:value="params.body"
                                    auto-size
                                    type="textarea"
                                />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="onSubmit">
                                    request
                                </a-button>
                            </a-form-item>
                        </a-form>
                    </a-card>
                    <a-card title="Response">
                        <pre>{{ responseInfo }}</pre>
                    </a-card>
                </div>
            </a-layout-content>
            <server-log />
        </a-layout>
    </a-layout>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import AppHeader from "./components/Header.vue";
import AppSider from "./components/Sider.vue";
import ServerLog from "./components/ServerLog.vue";
import { send } from "./utils/ws";
export default {
    name: "App",
    components: {
        AppHeader,
        AppSider,
        ServerLog
    },
    setup() {
        const requestInfo = reactive({
                key: "",
                request: null,
                response: null
            }),
            responseInfo = ref(""),
            params = reactive({
                name: "",
                body: ""
            });

        const onFunctionSelect = data => {
            console.log("request select:", data);
            params.name = data.key;
            requestInfo.key = data.key;
            requestInfo.request = JSON.stringify(data.request, null, 4);
            requestInfo.response = JSON.stringify(data.response, null, 4);

            params.body = "";
            responseInfo.value = "";
        };

        const onSubmit = () => {
            const data = params.body ? JSON.parse(params.body) : null;
            send(params.name, data).then(res => {
                console.log(`${params.name} response:`, res);
                responseInfo.value = JSON.stringify(res, null, 4);
            });
        };

        const store = useStore();

        return {
            onFunctionSelect,
            requestInfo,
            responseInfo,
            params,
            onSubmit,
            connected: computed(() => store.state.connected)
        };
    }
};
</script>

<style lang="less">
#app {
    display: flex;
    min-height: 100vh;
    .main-window {
        height: calc(100vh - 64px);
        overflow: auto;
        padding: 30px;
        .request-wrap {
            display: flex;
            .ant-card {
                flex: 1;
            }
        }
        pre {
            margin: 0;
            white-space: pre-wrap;
            word-break: break-word;
        }
        hr {
            margin: 36px 0;
        }
    }
}
</style>
