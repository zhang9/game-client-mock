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
export default {
    name: "App"
};
</script>

<style lang="less">
#app {
    display: flex;
    min-height: 100vh;
}
</style>
