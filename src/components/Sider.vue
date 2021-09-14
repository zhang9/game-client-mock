<template>
    <a-layout-sider class="sider" width="300px">
        <a-menu mode="inline" @click="handleClick">
            <a-menu-item :key="item.name" v-for="item in navs">
                {{ item.name }}
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>
<script>
import { computed, defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";
const SPROTO_TINTEGER = 0;
const SPROTO_TBOOLEAN = 1;
const SPROTO_TSTRING = 2;
const SPROTO_TSTRUCT = 3;
const PREFIX_KEYS = {
    pve: "pve",
    pvp: "pvp",
    vassal: "vassal",
    beauty: "beauty",
    hotspring: "hotspring",
    underling: "underling",
    office: "office",
    navigation: "navigation",
    mausoleum: "mausoleum",
    crossmausoleum: "crossmausoleum",
    global: "global",
    friend: "friend",
    minigame: "minigame",
    guild: "guild",
    crosspvp: "crosspvp",
    area: "area",
    reign: "reign",
    gachaevent: "gachaevent",
    luckybag: "luckybag",
    rankbonus: "rankbonus",
    party: "party",
    smallactivities: "smallactivities",
    event: "event",
    adventure: "adventure"
};
export default defineComponent({
    emits: ["function-select"],
    setup(props, { emit }) {
        const store = useStore(),
            c2s = computed(() => store.state.c2s),
            navs = computed(() => {
                return (
                    c2s.value?.proto.map(item => {
                        return {
                            request: item.p.find(
                                v => v && v.name === item.name + ".request"
                            ),
                            response: item.p.find(
                                v => v && v.name === item.name + ".response"
                            ),
                            name: item.name
                        };
                    }) ?? []
                );
            });
        const getCustomType = st => {
            const tmp = c2s.value.type[st];
            return getParams(tmp?.f);
        };
        const getParamsType = (type, st) => {
            switch (type) {
                case SPROTO_TINTEGER:
                    return "integer";
                case SPROTO_TBOOLEAN:
                    return "boolean";
                case SPROTO_TSTRING:
                    return "string";
                case SPROTO_TSTRUCT:
                    return getCustomType(st);
            }
        };
        const getParams = params => {
            if (!Array.isArray(params)) {
                return null;
            }
            const tmp = {};
            params.forEach(item => {
                tmp[item.name] = getParamsType(item.type, item.st);
            });
            return tmp;
        };
        const handleClick = e => {
            const key = e.key,
                item = navs.value.find(v => v.name === key),
                request = getParams(item.request?.f),
                response = getParams(item.response?.f);

            console.log("function select", key, request, response);
            emit("function-select", { key, request, response });
        };
        return {
            navs,
            handleClick
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
