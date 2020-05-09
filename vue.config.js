let proxyObj = {};
proxyObj['/'] = {
    ws: false,
    target: 'http://192.168.123.95:8083',
    // target: 'http://localhost:8083',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
};
module.exports = {
    devServer: {
        // host: 'localhost',
        host: '192.168.123.95',
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

