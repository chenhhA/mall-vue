let proxyObj = {};
proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:8083',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
};
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8082,
        proxy: proxyObj
    },
    css: {
        loaderOptions: {
            sass: {
                data:
                    '@import "@/assets/scss/_var.scss";@import "@/assets/scss/_mixin.scss";'
            }
        }
    }
};

