module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    chainWebpack(config) {
        config.module.rule("less").oneOfs.store.forEach(item => {
            item.use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    resources: "./src/assets/var.less"
                })
                .end();
        });
    }
};
