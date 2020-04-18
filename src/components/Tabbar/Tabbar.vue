<template>
    <van-tabbar v-model="active" style="z-index: 1999" placeholder="true">
        <van-tabbar-item replace to="/" icon="wap-home-o">
            首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/category" icon="apps-o">
            分类
        </van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="shopping-cart-o">
            购物车
        </van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">
            个人
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        name: "Tabbar",
        data(){
            return {
                active:0,
                tabbar: [
                    {
                        name: '首页',
                        path: '/',
                        pathName: 'home',
                        icon: 'wap-home-o',
                        dot: false,
                        info: ''
                    },
                    {
                        name: '分类',
                        path: '/items',
                        pathName: 'class',
                        icon: 'apps-o',
                        dot: false,
                        info: ''
                    },
                    {
                        name: '购物车',
                        path: '/order',
                        pathName: 'cart',
                        icon: 'shopping-cart-o',
                        dot: false,
                        info: ''
                    },
                    {
                        name: '我的',
                        path: '/user',
                        pathName: 'user',
                        icon: 'user-o',
                        dot: false,
                        info: ''
                    }
                ],
            }
        },
        watch: {
            $route: 'changeActive'
        },

        created() {
            const toName = this.$route.name;
            this.setActive(toName);
        },

        methods: {
            changeActive({ name }) {
                this.setActive(name);
            },
            setActive(name) {
                this.tabbar.forEach((tab, i) => {
                    if (tab.pathName == name) {
                        this.active = i;
                        return false;
                    }
                });
            }
        },


    }
</script>

<style scoped>

</style>
