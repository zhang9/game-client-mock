<template>
    <a-layout-sider class="sider" width="300px">
        <a-card
            size="small"
            :title="item.pname"
            :key="i"
            v-for="(item, i) in logs"
        >
            <pre>{{ item.result }}</pre>
        </a-card>
    </a-layout-sider>
</template>
<script>
import { defineComponent, reactive, watch } from "vue";
import { onResponseFinish } from "../utils/ws";
export default defineComponent({
    setup() {
        const logs = reactive([]);
        onResponseFinish(data => {
            console.log("onResponseFinish", data);
            logs.push(data);
        });
        return {
            logs
        };
    }
});
</script>
<style lang="less" scoped>
.sider {
    height: calc(100vh - 64px);
    overflow: auto;
}
</style>
